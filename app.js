import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import noteRoutes from "./routes/note.routes.js";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(express.json());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // 100 request
});

app.use(
  cors({
    origin: process.env.CLIENT_URL, // * দেবেন না
    credentials: true,
  }),
);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // Auth route-এ মাত্র 10 request
});

app.use(mongoSanitize());

app.use(limiter);
app.use("/api/auth", authLimiter);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
