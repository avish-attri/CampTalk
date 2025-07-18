import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import PostRoute from './routes/post.route.js';
import connectWithMongoDB from './db/Connection1.js';

const app = express();

// ✅ Dynamic CORS for multiple environments
const allowedOrigins = [
  'http://localhost:3000',
  'https://fantastic-queijadas-9c1b31.netlify.app/'
//   'https://fantastic-queijadas-9c1b31.netlify.app'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.options('*', cors());

connectWithMongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', PostRoute);

app.get('/', (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`);
});
