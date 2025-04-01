import { Router } from "express";
import { login, register, refresh } from "../controllers/authController.js";
import {
  validateRegister,
  validateLogin,
} from "../middlewares/validationMiddleware.js";

const authRouter = Router();

// TODO: What middlewares I can use here in these routes
// to check if req.body is fine?
authRouter.post("/login", validateLogin, login);

authRouter.post("/register", validateRegister, register);

// TODO: This route is not working!
// This route should be called when the jwt
// token passed to the client expired, so how to handle
// that in the backend here? What steps would you
// follow to "refresh" the token? what does the client
// should get if the make a request to "/auth/refresh"

authRouter.post("/refresh", refresh);

export { authRouter };
