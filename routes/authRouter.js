import express from "express";
import {
  signup,
  signin,
  getCurrent,
  logout,
} from "../controllers/authController.js";
import { userSigninSchema, userSignupSchema } from "../schemas/usersSchemas.js";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../midlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post("/users/register", validateBody(userSignupSchema), signup);

authRouter.post("/users/login", validateBody(userSigninSchema), signin);

authRouter.get("/users/current", authenticate, getCurrent);

authRouter.post("/users/logout", authenticate, logout);

export default authRouter;
