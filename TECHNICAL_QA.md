# Smart Flask — Technical Q&A for Evaluators

A complete reference of in-depth software questions an evaluator is likely to ask, answered specifically for this project.

---

## 1. System Architecture

**Q: What is the overall architecture of the system?**

Three-tier architecture:
1. **Hardware layer** — ESP8266 microcontroller reads MQ6, MQ7, and DHT11 sensors and POSTs raw readings to the Flask backend via HTTP.
2. **Backend layer** — Python Flask API (`ml_pipeline/app.py`) receives ESP data, runs it through a trained Random Forest classifier, stores the latest result in memory, and exposes REST endpoints. Deployed on Render.
3. **Frontend layer** — Next.js 16 App Router application polls the Flask backend every 2 seconds, renders live sensor data and ML predictions, and reads community/reaction data from Supabase directly.

**Q: How do the frontend and backend communicate?**

The Next.js frontend makes `fetch()` calls to the Flask API. The base URL is set via `NEXT_PUBLIC_API_URL` environment variable (defaults to `http://localhost:5001` in development). CORS is enabled on the Flask side via `Flask-CORS` so the browser can call across origins. The ESP8266 also calls the Flask API directly — it POSTs to `/predict`, not to Next.js.

**Q: Why are there two separate servers instead of one?**

Next.js handles UI/routing/Supabase queries. Flask handles the ML model inference, because scikit-learn is a Python library — there is no JavaScript equivalent that would run the same `.pkl` model file. They run on separate ports (3000 and 5001 locally) and separate Render services in production.

---

## 2. Next.js / React

**Q: Which Next.js version and routing strategy are you using?**

Next.js `16.1.7` with the **App Router** (the `app/` directory structure introduced in Next.js 13+). All pages are inside `app/` — e.g., `app/dashboard/page.tsx`, `app/account/page.tsx`, `app/reaction/[id]/page.tsx`. There are no `pages/` directory files.

**Q: What does `"use client"` mean and why do most components have it?**

In the App Router, components are **React Server Components by default** — they render on the server and send HTML. Adding `"use client"` marks a component as a Client Component, which ships JavaScript to the browser and can use React hooks (`useState`, `useEffect`, `useRef`) and browser APIs like `localStorage`, `fetch`, and event listeners. Since this app does live polling, animations, and auth state management, almost every interactive component needs `"use client"`.

**Q: What is React 19 and what's new about it?**

React 19 (used here: `19.2.3`) introduced stable server actions, the `use()` hook, improved form handling, and enhanced concurrent rendering. In this project, the relevant benefit is the improved hydration behaviour — less mismatch between server-rendered HTML and client state, which is important for components like `GlobalNav` that need to check auth state without flickering.

**Q: How does the dynamic route `/reaction/[id]` work?**

`app/reaction/[id]/page.tsx` is a dynamic segment. Next.js extracts the `id` from the URL and makes it available via the `useParams()` hook. The component does:
```ts
const params = useParams();
const reactionId = params?.id as string;
const reaction = STORED_REACTIONS.find((r) => r.id === reactionId);
```
`STORED_REACTIONS` is a hardcoded array in `lib/reactions.ts` — in a full production setup these would come from Supabase's `reactions` table.

**Q: How is global auth state shared across pages?**

Via React Context. `AuthProvider` (in `components/AuthContext.tsx`) wraps the entire app in `app/layout.tsx`. Any component that calls `useAuth()` gets the current user, login, signup, and logout functions from the same context instance — no prop drilling required.

**Q: How does the app avoid a "logged-out flash" on page refresh?**

`AuthContext.tsx` calls `supabase.auth.getSession()` in a `useEffect` on mount. If a valid session exists in the browser (stored in a Supabase-managed cookie/localStorage), it fetches the user's profile from the `profiles` table and sets state. The `GlobalNav` component separately uses a `mounted` state to render a placeholder of the same width as the auth button until React has hydrated, preventing layout shift.

---

## 3. Flask Backend

**Q: Why Flask instead of FastAPI or Django?**

Flask was chosen for its minimal footprint — the backend only needs to do three things: receive ESP sensor data, run ML inference, and serve a chatbot endpoint. Flask's simplicity maps perfectly to this. FastAPI would be appropriate if async performance or automatic OpenAPI schema generation from type annotations was a priority; Django would be overkill for an API-only service with no ORM need.

**Q: How does CORS work in this project?**

`Flask-CORS` is imported and applied as `CORS(app)` — a one-liner that adds `Access-Control-Allow-Origin: *` headers to all responses. This is required because the Next.js frontend runs on port 3000 and the Flask API runs on port 5001. Without it, the browser would block cross-origin responses due to the Same-Origin Policy. The `/chat` endpoint also explicitly handles `OPTIONS` preflight requests.

**Q: How is state stored between ESP readings?**

In a module-level Python variable:
```python
latest_reading = None
sensor_mode = "mq6"
```
This is in-memory state — it resets every time the server restarts and is not thread-safe under high concurrency. It works because Gunicorn is configured with `-w 1` (one worker), so there's a single process and no shared-memory issue. For production scale you'd use Redis.

**Q: What is Gunicorn and why is it used in production instead of Flask's built-in server?**

Flask's development server (`app.run()`) is single-threaded and not designed for production traffic. **Gunicorn** is a production-grade WSGI server that manages worker processes. In `render.yaml` it's started with:
```
gunicorn -w 1 -b 0.0.0.0:$PORT app:app
```
`-w 1` = 1 worker process (intentional — keeps `latest_reading` in a single memory space), `app:app` = module `app`, Flask instance `app`.

**Q: What is Flasgger and how does it work?**

`flasgger` is a Flask extension that generates an interactive **Swagger UI** (OpenAPI 2.0) at `/apidocs`. Instead of decorating routes with docstrings, this project passes a manually written `swagger_template` dict to `Swagger(app, template=swagger_template)`. That dict defines every endpoint's method, parameters, request body schema, and response codes. This makes it easy to test the API in a browser without writing a separate Postman collection.

---

## 4. Machine Learning

**Q: What ML algorithm is used and why?**

**Random Forest Classifier** from scikit-learn (`RandomForestClassifier(n_estimators=100, random_state=42)`). It was chosen over Isolation Forest (which the README mentions, but the actual code uses RFC) because:
- The problem is **supervised** — the synthetic training data already has labelled classes (`Safe`, `Warning`, `Danger`)
- Random Forests handle tabular sensor data well with no scaling required
- They output `predict_proba()`, giving a probability per class which is used as the anomaly confidence score on the dashboard
- They're interpretable — feature importances can be extracted

**Q: What are the input features to the model?**

Four numeric features:
- `mq6_gas` — LPG/butane concentration in ppm from MQ6 sensor
- `mq7_gas` — Carbon monoxide concentration in ppm from MQ7 sensor
- `temperature` — Ambient temperature in °C from DHT11
- `humidity` — Relative humidity % from DHT11

**Q: How was the training data generated?**

`generate_data.py` creates 5,000 synthetic samples using NumPy's `np.random.normal()` with environment-specific baselines:
- MQ6: mean=300 ppm, std=30
- MQ7: mean=35 ppm, std=5
- Temperature: mean=31°C, std=2 (calibrated to the local lab ambient)
- Humidity: mean=45%, std=5

Then 5% of rows (250 samples) are injected with anomalies: random MQ6 spikes (800–2000 ppm), MQ7 spikes (200–1000 ppm), or overheating (temperature 50–100°C, humidity 10–25%). Labels are set to `Danger` or `Warning` accordingly. `np.random.seed(42)` ensures reproducibility.

**Q: How is the model serialized and loaded?**

`joblib.dump(model, 'anomaly_model.pkl')` saves the trained model. `joblib.load(model_path)` loads it when Flask starts. `joblib` is preferred over `pickle` for scikit-learn models because it's faster for large NumPy arrays (uses memory-mapped files internally). The `.pkl` file is committed to the repo so Render doesn't need to retrain on deploy.

**Q: How is the anomaly confidence score calculated?**

```python
probabilities = model.predict_proba(features)[0]
score = float(np.sum(probabilities[1:]))
```
`predict_proba` returns `[p_safe, p_warning, p_danger]`. The anomaly score is the sum of the Warning and Danger probabilities — i.e., "how confident is the model that something is wrong". This is displayed as a percentage on the dashboard's confidence bar.

**Q: What does the model output and how is it mapped to dashboard status?**

```python
# 0 = Safe, 1 = Warning, 2 = Danger
prediction = int(model.predict(features)[0])
map_status = {0: "Safe", 1: "Warning", 2: "Danger"}
```
The dashboard then uses `status_label` to change the banner colour (green/amber/red), trigger the pulsing border animation, and fire the full-screen alert overlay.

---

## 5. Supabase

**Q: What is Supabase and how is it used in this project?**

Supabase is an open-source Firebase alternative built on **PostgreSQL**. It provides a hosted database, auto-generated REST and real-time APIs, and an Auth service. In this project it's used for:
1. **Auth** — `supabase.auth.signUp()`, `signInWithPassword()`, `signOut()`, `onAuthStateChange()` for user management
2. **Profiles table** — stores `id` (FK to `auth.users`), `username`, `email`, `avatar_url`
3. **`experiment_results` table** — stores saved experiment data (sensor readings array, reaction ID, duration, step timings)
4. **`reactions` table** — master list of chemical reactions
5. **Dashboard count** — a `count` query to show total global experiments run

**Q: How is the Supabase client initialised?**

In `lib/supabase.ts`:
```ts
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```
The `NEXT_PUBLIC_` prefix is required for Next.js to expose env vars to the browser bundle. A fallback dummy value prevents build failures if the env file is missing.

**Q: How does Supabase Auth work — what happens during signup?**

```ts
const { data, error } = await supabase.auth.signUp({ email, password });
// data.user.id = UUID assigned by Supabase Auth
await supabase.from("profiles").upsert({
  id: data.user.id,
  username: name,
  email,
});
```
Supabase manages the password hash (bcrypt), JWT token generation, and session cookies internally. After `signUp`, we immediately upsert a row into `profiles` using the auth UUID as the primary key. `onAuthStateChange` fires with the new session, which triggers `fetchProfile` to load the username and set React state.

**Q: Why use `upsert` instead of `insert` for the profile?**

`upsert` (INSERT ... ON CONFLICT DO UPDATE) handles the case where a user signs up, the profile insert fails, and they retry. Without `upsert`, the second attempt would throw a unique constraint error. It also handles the case where a profile row already exists for that UUID (e.g., migrated data).

**Q: What is Row Level Security (RLS)?**

PostgreSQL policy system that Supabase exposes. When enabled on a table, every query is automatically filtered by a policy. For `profiles`:
```sql
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);
```
`auth.uid()` is a Supabase function that returns the UUID of the currently authenticated user from the JWT. This means a user can only read their own profile row, even with the public anon key.

**Q: What is the difference between `supabase.auth.getSession()` and `onAuthStateChange()`?**

- `getSession()` is a **one-time check** — called on mount to restore an existing session from storage (used on page refresh)
- `onAuthStateChange()` is a **subscription** — fires every time auth state changes (login, logout, token refresh, tab focus). It returns a subscription object with `.unsubscribe()` which is called in the `useEffect` cleanup to prevent memory leaks

---

## 6. Hardware (ESP8266)

**Q: What is the ESP8266 and how does it fit in?**

The **ESP8266** is a low-cost Wi-Fi microcontroller (~$3). It reads sensor values and POSTs them as JSON to the Flask `/predict` endpoint over Wi-Fi. Flask processes the data, runs ML inference, and stores the result. The Next.js dashboard polls `/latest` every 2 seconds to get the most recent classified reading. The ESP never communicates with Next.js directly.

**Q: Why is there only one analog pin (A0) but two gas sensors?**

The ESP8266 has only **one ADC pin** (A0). MQ6 and MQ7 cannot both be read simultaneously. The firmware switches which sensor is physically wired to A0 based on the `sensor_mode` it reads from the server's `/predict` response (`"sensor_mode"` field). The dashboard's toggle button POSTs to `/sensor-mode` to change which sensor is active on the next ESP cycle. `data_mode` in the response tells the frontend which sensor was actually active for that reading (for correct display), while `sensor_mode` tells the ESP what to switch to next.

**Q: What do MQ6 and MQ7 detect?**

- **MQ6** — detects LPG, butane, propane, isobutane, and other combustible hydrocarbons. Useful for gas leak detection in chemistry labs. Normal baseline ~300 ppm; danger threshold ~500+ ppm.
- **MQ7** — detects Carbon Monoxide (CO) specifically. CO is produced in incomplete combustion reactions (e.g., charcoal burning). Normal baseline ~35 ppm; danger threshold ~100+ ppm.
- **DHT11** — temperature (accuracy ±2°C) and humidity (accuracy ±5%). Used to detect overheating events.

---

## 7. Groq / AI Chatbot

**Q: What is Groq and why was it chosen over OpenAI?**

**Groq** is an AI inference provider running models on custom LPU (Language Processing Unit) hardware. It was chosen because:
1. It has a **free tier** with generous rate limits suitable for a student project
2. Its inference speed is significantly faster than OpenAI for the same model sizes
3. It supports the **Llama 3.3 70B Versatile** model which is open-weight and highly capable

**Q: How is the chatbot context-aware of live sensor data?**

The `/chat` endpoint injects the latest sensor reading into the system prompt:
```python
if latest_reading:
    system_content += f"\n\nHere is the latest live sensor reading..."
    # appends MQ6, MQ7, temp, humidity, status_label, anomaly_score
```
So if the user asks "Is my lab safe right now?", the model has the actual current readings in its context and can give a specific, accurate answer rather than a generic one.

**Q: What model is used and what are its parameters?**

```python
groq_client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    temperature=0.7,
    max_tokens=1024,
    top_p=1,
)
```
`temperature=0.7` gives a balance of coherence and creativity. `max_tokens=1024` caps the response length to keep it focused.

**Q: How does the chatbot maintain conversation history?**

The frontend (`Chatbot.tsx`) maintains a `messages` array in React state. On every send, it appends the new user message and sends the **entire conversation history** in the POST body. Flask passes this directly to Groq, so the model has full turn-by-turn context. This is the standard stateless multi-turn pattern — the server holds no session state.

---

## 8. Framer Motion

**Q: What is Framer Motion and how is it used here?**

Framer Motion (`framer-motion` v12) is an animation library for React. In this project it's used for:
- **Page entry animations** — `initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}` on every major section
- **Scroll-triggered animations** — `whileInView` + `viewport={{ once: true }}` so elements animate in as they enter the viewport
- **Presence animations** — `AnimatePresence` wraps the auth modal, sidebar, and alert overlay, so they animate out smoothly on unmount (something plain CSS transitions can't do because React removes the element immediately)
- **Keyframe pulsing** — The danger status banner uses `animate={{ boxShadow: [...keyframes] }}` to create a looping red glow effect
- **Spring physics** — The sidebar drawer uses `transition={{ type: "spring", damping: 25, stiffness: 200 }}` for a natural pull-out feel

**Q: What is `AnimatePresence` and why is it needed?**

React unmounts components immediately when they leave the tree — there's no built-in way to animate the exit. `AnimatePresence` intercepts unmounts, plays the `exit` animation, and only then removes the element from the DOM. Used for the modal (`exit={{ opacity: 0, scale: 0.95, y: 20 }}`), the sidebar (`exit={{ x: "-100%" }}`), and the full-screen alert overlay.

---

## 9. Tailwind CSS v4

**Q: What's different about Tailwind CSS v4?**

Tailwind v4 (used here via `@tailwindcss/postcss`) moves configuration entirely into CSS — there is no `tailwind.config.js`. Customisation is done with CSS `@theme` blocks. It also introduces `bg-linear-to-br` (instead of `bg-gradient-to-br`), improved performance, and a smaller output. The `@tailwindcss/postcss` package replaces the old `tailwindcss` PostCSS plugin.

---

## 10. TypeScript

**Q: How is TypeScript used and what types are defined?**

All frontend files are `.ts` or `.tsx`. Custom types are defined in `lib/supabase.ts`:
- `Profile` — `{ id, username, email, avatar_url, created_at }`
- `Reaction`, `ReactionStep`, `ExpectedDataPoint`
- `RecordedDataPoint`, `ExperimentResult`

In components, inline types are used for component-local state (e.g., `PredictionResult`, `SensorData` in `DashboardSection.tsx`). The `useAuth()` hook is typed through `AuthContextType`, ensuring login/signup return `Promise<{ error: string | null }>` — TypeScript enforces that callers handle the error field.

---

## 11. Deployment

**Q: How is the Flask backend deployed?**

Via **Render** using `render.yaml`:
```yaml
buildCommand: "cd ml_pipeline && pip install -r requirements.txt"
startCommand: "cd ml_pipeline && gunicorn -w 1 -b 0.0.0.0:$PORT app:app"
```
Render injects `$PORT` automatically. The free tier plan is used. The `anomaly_model.pkl` file is included in the Git repo so it's available at startup without needing a training step on deploy.

**Q: Where is the Next.js frontend deployed?**

Next.js deploys naturally to **Vercel** (the company that built Next.js). `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `NEXT_PUBLIC_API_URL` (pointing to the Render Flask URL) are set as Vercel environment variables.

**Q: Why is `scikit-learn` pinned to `1.8.0` in requirements.txt?**

A trained `.pkl` model file is version-coupled to the scikit-learn version that created it. Loading a model pickle with a different scikit-learn version often throws errors or silently produces wrong results. Pinning ensures the version on Render matches the version used during local training.

---

## 12. Data Flow — End to End

**Q: Walk through what happens from ESP reading to dashboard display.**

1. **ESP8266** reads analog voltage from whichever sensor is on A0, reads DHT11, constructs JSON: `{ mq6_gas, mq7_gas, temperature, humidity, active_mode }`, POSTs to `https://<render-url>/predict`.
2. **Flask `/predict`** extracts the four sensor values, builds a NumPy array `[[mq6, mq7, temp, hum]]`, calls `model.predict()` and `model.predict_proba()`, maps to `Safe/Warning/Danger`, computes anomaly score, stores result in `latest_reading`, returns JSON.
3. **Next.js `DashboardSection`** has a `setInterval` running every 2000ms. It calls `GET /latest`, receives the same JSON, updates React state (`setData`, `setHistory`).
4. React re-renders: status banner changes colour, SVG line charts append a new point, the log feed adds a row. If status is Warning or Danger and it's an escalation, `setAlertOpen(true)` fires the full-screen overlay.

---

## 13. Common Follow-Up Questions

**Q: Why is training accuracy 99.82% — isn't that suspiciously high?**

Yes, this is because the model is evaluated on training data (not a held-out test set). The synthetic data is generated from clean Gaussian distributions with clearly separated anomaly ranges, so the model memorises the patterns perfectly. In production with real sensor noise the accuracy would be lower. A proper evaluation would use `train_test_split` and report test accuracy.

**Q: What happens if the ESP is offline?**

`GET /latest` returns 404. The dashboard catches this (`res.status === 404`), sets `espConnected = false`, and shows the "Waiting for ESP..." badge. The rest of the UI stays rendered with the last known data (or `--` placeholders on first load). No crash.

**Q: Is there any real-time WebSocket or Server-Sent Event connection?**

No — the architecture uses **polling** (HTTP GET every 2s). WebSockets would reduce latency and server load at scale, but for a lab demo with one ESP and one browser client, polling is simpler and sufficient. Supabase Realtime (which uses WebSockets) is available but not wired up to the dashboard readings table.

**Q: How is the sensor history stored?**

Two places: (1) `real_sensor_data.csv` on the Flask server — appended by the ESP firmware indirectly, served by `GET /history` (last 15 rows). (2) `experiment_results` table in Supabase — experiment sessions can be saved (public or private) from the reaction execution page, storing the full `RecordedDataPoint[]` array as JSONB.

**Q: What security concerns exist?**

- The Supabase anon key is `NEXT_PUBLIC_` — it's exposed in the browser. This is by design; Supabase anon keys are safe to expose because RLS policies control what data can be accessed. The service-role key (which bypasses RLS) is never used client-side.
- Flask has no authentication on its endpoints — anyone who knows the Render URL can POST to `/predict` or `/chat`. For a production system, API key middleware would be added.
- The Groq API key is server-side only (read via `python-dotenv` in Flask), never sent to the browser.
