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
// POST /api/auth/register
authRouter.post("/register", validateBody(userSignupSchema), signup);
// GET /api/auth/verify/:verificationCode
authRouter.get("/verify/:verificationCode", verify);
// POST /api/auth/verify
authRouter.post("/verify", validateBody(userEmailSchema), verifyResend);
// POST /api/auth/login
authRouter.post("/login", validateBody(userSigninSchema), signin);
// GET /api/auth/current
authRouter.get("/current", authenticate, getCurrent);
// POST /api/auth/logout
authRouter.post("/logout", authenticate, logout);
// PATCH /api/auth/avatars
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

export default authRouter;
