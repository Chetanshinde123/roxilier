/** @format */

import express from "express";
import cors from "cors";
import db from "./models/index.js"; // Adjust the path as necessary
import router from "./routes/userRoutes.js";
import dotenv from "dotenv";
import adminRouter from "./routes/adminRoute.js";
import storeRouter from "./routes/storeRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.use("/api", router);
app.use("/api/admin", adminRouter); // Ensure adminRouter is imported correctly
app.use("/api/store", storeRouter); // Ensure storeRouter is imported correctly

// Server listening on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
