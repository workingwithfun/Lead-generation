import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes";
import leadRoutes from "./routes/leadRoutes";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (_, res) => {
  res.send("API Running");
});
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});