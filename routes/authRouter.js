import express from "express";
import {
  signup,
  signin,
  getCurrent,
  logout,
  updateAvatar,
  verify,
  verifyResend,
} from "../controllers/authController.js";
import {
  userSigninSchema,
  userSignupSchema,
  userEmailSchema,
} from "../schemas/usersSchemas.js";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../midlewares/authenticate.js";
import upload from "../midlewares/upload.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userSignupSchema), signup);

authRouter.get("/verify/:verificationCode", verify);

authRouter.post("/verify", validateBody(userEmailSchema), verifyResend);

authRouter.post("/login", validateBody(userSigninSchema), signin);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logout);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

export default authRouter;
