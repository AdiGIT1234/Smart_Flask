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

// -------- Active Sensor Mode --------
// 'mq6' = A0 pin is reading MQ6 (LPG), 'mq7' = A0 pin is reading MQ7 (CO)
// Controlled remotely via Flask /sensor-mode endpoint toggled from dashboard
String activeMode = "mq6";

// -------- WiFiManager --------
WiFiManager wm;

// Custom field
WiFiManagerParameter custom_server("server", "Server URL", serverUrl, 100);

// -------- Reset Button --------
#define RESET_PIN D3

void setup() {
  Serial.begin(9600);
  // Add a small delay for serial to stabilize, then print a welcome message
  delay(1000);
  Serial.println("\n\n--- Booting Smart Flask ESP ---");

  lcd.init();
  lcd.backlight();
  dht.begin();
  pinMode(MQ7, INPUT);
  pinMode(RESET_PIN, INPUT_PULLUP);

  // -------- Reset WiFi if button pressed --------
  if (digitalRead(RESET_PIN) == LOW) {
    Serial.println("Reset button held! Clearing WiFiManager settings...");
    wm.resetSettings();
    ESP.restart();
  }

  Serial.println("Setting up WiFiManager (Captive Portal)...");
  lcd.setCursor(0, 0);
  lcd.print("WiFi Setup...");

  // Add custom field
  wm.addParameter(&custom_server);

  // Captive portal + auto connect
  bool res = wm.autoConnect("ESP_Config");

  if (!res) {
    Serial.println("Failed to connect to WiFi! Restarting...");
    lcd.clear();
    lcd.print("Failed!");
    delay(3000);
    ESP.restart();
  }

  // Save custom parameter
  strcpy(serverUrl, custom_server.getValue());

  Serial.println("WiFi Connected!");
  Serial.print("IP: ");
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
  Serial.println("Setup Complete. Starting Loop!");
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
    Serial.println("DHT error! Check sensor wiring.");
    lcd.setCursor(0, 0);
    lcd.print("DHT Sensor Err! ");
    delay(2000); // CRITICAL FIX: Add delay here so it doesn't spam rapidly
    return;
  }

  // A0 always read; routed to mq6 or mq7 based on activeMode
  int a0_value = analogRead(A0);
  int mq7_digital = digitalRead(MQ7); // D7 digital threshold (0/1)

  int mq6_send = (activeMode == "mq6") ? a0_value : 300;  // 300 = safe default when MQ6 not on A0
  int mq7_send = (activeMode == "mq7") ? a0_value : mq7_digital;

  // -------- Serial --------
  Serial.print("Mode: "); Serial.print(activeMode);
  Serial.print(" Temp: "); Serial.print(temp);
  Serial.print(" Hum: "); Serial.print(hum);
  Serial.print(" A0: "); Serial.print(a0_value);
  Serial.print(" MQ7_D: "); Serial.println(mq7_digital);

  // -------- LCD Line 1: Mode + Temp + Humidity --------
  lcd.setCursor(0, 0);
  lcd.print(activeMode == "mq6" ? "M6 " : "M7 ");
  lcd.print("T:");
  lcd.print(temp, 1);
  lcd.print(" H:");
  lcd.print(hum, 0);
  lcd.print("  ");

  // -------- LCD Line 2: Gas reading --------
  lcd.setCursor(0, 1);
  lcd.print("                ");
  lcd.setCursor(0, 1);
  lcd.print("G:");
  lcd.print(a0_value);
  lcd.print(" ");

  // -------- HTTP ML Request --------
  Serial.print("WiFi status: ");
  Serial.println(WiFi.status() == WL_CONNECTED ? "CONNECTED" : "DISCONNECTED");

  if (WiFi.status() == WL_CONNECTED) {

    WiFiClientSecure client;
    client.setInsecure(); // Skip SSL cert verification (fine for IoT sensor data)
    HTTPClient http;

    http.begin(client, serverUrl);
    http.addHeader("Content-Type", "application/json");
    http.setTimeout(8000); // 8s — enough for HTTPS handshake + Render response

    String jsonPayload = "{\"mq6_gas\":" + String(mq6_send) +
                         ",\"mq7_gas\":" + String(mq7_send) +
                         ",\"temperature\":" + String(temp) +
                         ",\"humidity\":" + String(hum) + "}";

    Serial.print("Mode: "); Serial.print(activeMode);
    Serial.print(" | Posting payload: "); Serial.println(jsonPayload);

    int httpResponseCode = http.POST(jsonPayload);

    Serial.print("HTTP Response Code: ");
    Serial.println(httpResponseCode);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.print("Response: "); Serial.println(response);

      DynamicJsonDocument doc(512); // larger to fit sensor_mode field
      deserializeJson(doc, response);

      String status = doc["status_label"].as<String>();

      // Update active mode from server response (dashboard may have toggled it)
      if (doc.containsKey("sensor_mode")) {
        activeMode = doc["sensor_mode"].as<String>();
        Serial.print("Mode updated to: "); Serial.println(activeMode);
      }

      if (status == "Danger") {
        lcd.print("[DNG]");
      } else if (status == "Warning") {
        lcd.print("[WRN]");
      } else {
        lcd.print("[SAF]");
      }
    } else {
      lcd.print("ERR");
      Serial.print("Error: ");
      Serial.println(http.errorToString(httpResponseCode));
    }

    http.end();
  } else {
    lcd.print("NoWiFi");
    Serial.println("WiFi not connected — skipping HTTP");
  }

  delay(2000);
}
