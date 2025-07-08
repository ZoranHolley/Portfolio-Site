import { useState } from "react";

const API_KEY = import.meta.env.VITE_WEATHER_KEY; // we'll replace soon

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  async function fetchWeather(e) {
    e.preventDefault();
    setError("");
    setWeather(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&units=metric&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main style={{ fontFamily: "system-ui", maxWidth: 480, margin: "2rem auto" }}>
      <h1>Weather Dashboard</h1>

      <form onSubmit={fetchWeather}>
        <input
          type="text"
          placeholder="Enter city…"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: "0.5rem", width: "70%" }}
          required
        />
        <button style={{ padding: "0.55rem 1rem" }}>Get Weather</button>
      </form>

      {error && <p role="alert">{error}</p>}

      {weather && (
        <section style={{ marginTop: "1rem" }}>
          <h2>{weather.name}</h2>
          <p style={{ fontSize: "3rem", margin: 0 }}>
            {Math.round(weather.main.temp)}°C
          </p>
          <p>{weather.weather[0].description}</p>
        </section>
      )}
    </main>
  );
}
