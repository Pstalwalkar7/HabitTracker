import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [habits, setHabits] = useState([]);
  const [form, setForm] = useState({ date: "", activities: "", mood: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/api/habits").then(res => setHabits(res.data));
  }, []);

  const submitHabit = async () => {
    const payload = { ...form, activities: form.activities.split(",").map(a => a.trim()) };
    await axios.post("http://localhost:5000/api/habits", payload);
    const res = await axios.get("http://localhost:5000/api/habits");
    setHabits(res.data);
    setForm({ date: "", activities: "", mood: "" });
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>Habit Tracker Dashboard</h2>
      <input placeholder="Date (YYYY-MM-DD)" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
      <input placeholder="Activities (comma separated)" value={form.activities} onChange={e => setForm({ ...form, activities: e.target.value })} />
      <input placeholder="Mood" value={form.mood} onChange={e => setForm({ ...form, mood: e.target.value })} />
      <button onClick={submitHabit}>Save</button>

      <h3>History</h3>
      {habits.map(h => (
        <div key={h._id} style={{ marginBottom: 10, border: "1px solid #ccc", padding: 10 }}>
          <b>{h.date}</b> | Mood: {h.mood} | Activities: {h.activities.join(", ")}
        </div>
      ))}
    </div>
  );
}
