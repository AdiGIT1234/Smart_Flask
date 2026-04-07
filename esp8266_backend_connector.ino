#include <ArduinoJson.h>
#include <DHT.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <LiquidCrystal_I2C.h>
#include <WiFiClientSecure.h>
#include <WiFiManager.h>
#include <Wire.h>

// -------- LCD --------
LiquidCrystal_I2C lcd(0x27, 16, 2);

// -------- DHT --------
#define DHTPIN D5
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// -------- MQ Sensors --------
#define MQ6 A0
#define MQ7 D7

// -------- Custom Parameter (Server URL) --------
// If you ever reset your ESP8266, it will default to connecting to your cloud
// pipeline automatically!
char serverUrl[100] = "https://smart-flask-ml-backend.onrender.com/predict";

// -------- WiFiManager --------
WiFiManager wm;

// Custom field
WiFiManagerParameter custom_server("server", "Server URL", serverUrl, 100);

// -------- Reset Button --------
#define RESET_PIN D3

void setup() {
  Serial.begin(9600);

  lcd.init();
  lcd.backlight();
  dht.begin();
  pinMode(MQ7, INPUT);
  pinMode(RESET_PIN, INPUT_PULLUP);

  // -------- Reset WiFi if button pressed --------
  if (digitalRead(RESET_PIN) == LOW) {
    wm.resetSettings();
    ESP.restart();
  }

  lcd.setCursor(0, 0);
  lcd.print("WiFi Setup...");

  // Add custom field
  wm.addParameter(&custom_server);

  // Captive portal + auto connect
  bool res = wm.autoConnect("ESP_Config");

  if (!res) {
    lcd.clear();
    lcd.print("Failed!");
    delay(3000);
    ESP.restart();
  }

  // Save custom parameter
  strcpy(serverUrl, custom_server.getValue());

  Serial.println("Connected!");
  Serial.println(WiFi.localIP());
  Serial.print("Server URL: ");
  Serial.println(serverUrl);

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Connected!");
  delay(1000);

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("IP:");
  lcd.print(WiFi.localIP());
  delay(2000);

  lcd.clear();
  lcd.print("Warming up...");
  delay(5000);
  lcd.clear();
}

void loop() {

  // -------- Auto WiFi Reconnect --------
  if (WiFi.status() != WL_CONNECTED) {
    WiFi.reconnect();
  }

  // -------- Read sensors --------
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();

  if (isnan(temp) || isnan(hum)) {
    Serial.println("DHT error!");
    return;
  }

  int mq6_value = analogRead(MQ6);
  int mq7_value = digitalRead(MQ7);

  // -------- Serial --------
  Serial.print("Temp: ");
  Serial.print(temp);
  Serial.print(" Hum: ");
  Serial.print(hum);
  Serial.print(" MQ6: ");
  Serial.print(mq6_value);
  Serial.print(" MQ7: ");
  Serial.println(mq7_value);

  // -------- LCD Line 1 --------
  lcd.setCursor(0, 0);
  lcd.print("T:");
  lcd.print(temp, 1);
  lcd.print(" H:");
  lcd.print(hum, 0);
  lcd.print("   ");

  // -------- LCD Line 2 --------
  lcd.setCursor(0, 1);
  lcd.print("                ");
  lcd.setCursor(0, 1);
  lcd.print("G:");
  lcd.print(mq6_value);
  lcd.print(" ");

  // -------- HTTP ML Request --------
  if (WiFi.status() == WL_CONNECTED) {

    WiFiClientSecure client;
    client.setInsecure(); // Skip SSL cert verification (fine for IoT sensor data)
    HTTPClient http;

    http.begin(client, serverUrl);
    http.addHeader("Content-Type", "application/json");
    http.setTimeout(8000); // 8s — enough for HTTPS handshake + Render response

    String jsonPayload = "{\"mq6_gas\":" + String(mq6_value) +
                         ",\"mq7_gas\":" + String(mq7_value) +
                         ",\"temperature\":" + String(temp) +
                         ",\"humidity\":" + String(hum) + "}";

    int httpResponseCode = http.POST(jsonPayload);

    if (httpResponseCode > 0) {
      String response = http.getString();

      DynamicJsonDocument doc(256);
      deserializeJson(doc, response);

      String status = doc["status_label"];

      if (status == "Danger") {
        lcd.print("[DNG]");
      } else if (status == "Warning") {
        lcd.print("[WRN]");
      } else {
        lcd.print("[SAF]");
      }
    } else {
      lcd.print("ERR");
      Serial.println(http.errorToString(httpResponseCode));
    }

    http.end();
  } else {
    lcd.print("NoWiFi");
  }

  delay(2000);
}
