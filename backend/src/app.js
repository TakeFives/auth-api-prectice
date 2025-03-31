import { authRouter } from "./routes/authRoutes.js";
import { recipesRouter } from "./routes/recipesRoutes.js";
import { auth } from "./middlewares/authMiddleware.js";

// TODO: My server is not working!!!
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

const app = express();

app.use(express.json());

// TODO: what other middlewares I can use here?
// TODO: Make a note to yourself, why do I need this?
app.use();

// sets security response headers
// TODO: Important middleware to keep things secure?
app.use();

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(" ");
console.log(allowedOrigins);

// WARN: This should be handle with .env variables NOT hardcoding it here
// becuse URL would change in development and PRODUCTION or when live!
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// TODO: Create a root endpoint saying "You have reached / the root of the server!"

// TODO: fix the routes! Make sure its own route has the correct controller/handler

app.use("/auth");

// WARN: we can have middleware validators for any incoming request!
// 1. auth gets checked first
// 2. if validation passes, then recipes router is good to go!

// TODO: what is the middleware I can use before recipesRouter gets handled?
app.use("/recipes");

export { app };
