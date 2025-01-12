import express from 'express';
const app = express();
import multer from "multer";
import dotenv from "dotenv";
import errorMiddleWare from "./utilis/error.js";
import cookie from "cookie-parser";
import { expressMiddleware } from '@apollo/server/express4';
import { Graphqlserver } from './Server/GraphqlLogic.js';
import cors from 'cors';

dotenv.config({ path: ".env" });

app.get("/", async (req, res) => {
    res.send("Hello From Server");
});

app.use(cors({
    origin: process.env.CORS_ALLOWED_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(cookie());
app.use(express.urlencoded({ extended: true, parameterLimit: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Graphql Setup
await Graphqlserver.start();
// For Users
app.use("/graphql", expressMiddleware(Graphqlserver, { context: async ({ req, res }) => ({ req, res }) }));

// Route Handle
import NewsRoute from "./Route/NewsRoute.js";
app.use("/api/v1/", upload.single('video'), NewsRoute);

// Middleware for error
app.use(errorMiddleWare);

// Add error handling for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Close the server to prevent memory leaks
    app.close();
});

// Add error handling for uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // Close the server to prevent memory leaks
    app.close();
});

export default app;
