import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as authSevices from "../services/authServices.js";

import HttpError from "../helpers/HttpError.js";

const { JWT_SECRET } = process.env;

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authSevices.findUser({ email });
    if (user) {
      throw HttpError(409, "Email already in use");
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = await authSevices.signup({
      ...req.body,
      password: hashpassword,
    });
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authSevices.findUser({ email });

    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }

    const { _id: id } = user;
    const payload = {
      id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await authSevices.updateUser({ _id: id }, { token });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

export const getCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

export const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await authSevices.updateUser({ _id }, { token: "" });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
