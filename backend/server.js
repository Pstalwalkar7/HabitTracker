import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/habits", { useNewUrlParser: true, useUnifiedTopology: true });

// Schema + Model
const habitSchema = new mongoose.Schema({
  date: String,
  activities: [String],
  mood: String
});
const Habit = mongoose.model("Habit", habitSchema);

// Routes
app.get("/api/habits", async (req, res) => {
  const habits = await Habit.find().sort({ date: -1 });
  res.json(habits);
});

app.post("/api/habits", async (req, res) => {
  const habit = new Habit(req.body);
  await habit.save();
  res.json({ success: true });
});

app.put("/api/habits/:id", async (req, res) => {
  await Habit.findByIdAndUpdate(req.params.id, req.body);
  res.json({ success: true });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
