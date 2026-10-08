import express from "express";
import cors from "cors";

import { connectDB } from "../backend/config/database";
import productRoutes from "../backend/routes/product.routes";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

// Health check — keep this BEFORE database connection
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "API is working",
    environment: process.env.NODE_ENV,
  });
});

// Database + products
app.use(async (_req, _res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB connection error:", error);
    next(error);
  }
});

app.use("/api/products", productRoutes);

export default app;