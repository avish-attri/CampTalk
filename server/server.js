import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import PostRoute from "./routes/post.route.js";
import UserRoute from "./routes/user.route.js";
import connectWithMongoDB from "./db/Connection1.js";

const app = express();

// ✅ Explicit list of allowed frontend origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://camp-talk.vercel.app", // main production frontend
  "https://camp-talk-gfrw.vercel.app", // ✅ your current frontend domain (as per the error)
  "https://camp-talk-27fi-git-main-avishs-projects-3.vercel.app", // vercel preview
  /\.vercel\.app$/
];

// ✅ CORS middleware setup with debugging log
app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Incoming Origin:", origin); // Optional: for debugging
      if (!origin) return callback(null, true); // Allow non-browser tools
      const isAllowed = allowedOrigins.some((o) =>
        o instanceof RegExp ? o.test(origin) : o === origin
      );
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error("❌ Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);

// ✅ Handle preflight requests globally
app.options("*", cors());

// ✅ Middleware for JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB connection
connectWithMongoDB();

// ✅ API routes
app.use("/api/v1", PostRoute);
app.use("/api/v1/user", UserRoute);

// ✅ Root route
app.get("/", (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
    message: "Server is running successfully 🚀",
  });
});

// ✅ Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port: ${PORT}`);
});
