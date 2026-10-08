import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

app.get("/api/health", async (_req, res) => {
  res.json({
    success: true,
    message: "API is working",
  });
});

// your routes
// app.use("/api/products", productRoutes);

export default app;