import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import PostRoute from "./routes/post.route.js";
import UserRoute from "./routes/user.route.js";
import connectWithMongoDB from "./db/Connection1.js";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://camptalk.vercel.app", // Correct frontend URL (no dash)
  "https://camp-talk-27fi-git-main-avishs-projects-3.vercel.app", // Added Vercel preview URL
  /\.vercel\.app$/,
  /\.netlify\.app$/
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.some((o) =>
          o instanceof RegExp ? o.test(origin) : o === origin
        )
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Handle preflight requests for all routes
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectWithMongoDB();

app.use("/api/v1", PostRoute);
app.use("/api/v1/user", UserRoute);

app.get("/", (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
    message: "Server is running successfully 🚀",
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port: ${PORT}`);
});
