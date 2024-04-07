import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs/promises";
import gravatar from "gravatar";
import * as authSevices from "../services/authServices.js";
import Jimp from "jimp";

import HttpError from "../helpers/HttpError.js";

const { JWT_SECRET } = process.env;

const avatarsPath = path.resolve("public", "avatars");

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authSevices.findUser({ email });
    if (user) {
      throw HttpError(409, "Email already in use");
    }
    const avatarUrl = gravatar.url(email);
    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = await authSevices.signup({
      ...req.body,
      avatarUrl,
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
    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
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
    const { _id } = req.body;
    await authSevices.updateUser({ _id }, { token: "" });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    const { id } = req.user;

    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarsPath, filename);

    await fs.rename(oldPath, newPath);

    await Jimp.read(newPath)
      .then((image) => {
        return image.resize(250, 250).write(newPath);
      })
      .catch((err) => {
        console.error(err);
      });

    const avatarUrl = path.join("avatars", filename);
    const result = await authSevices.updateUser({ _id: id }, { avatarUrl });

    if (!result) {
      throw HttpError(404, `Contact with ${id} not found`);
    }
    res.json({ avatarUrl });
  } catch (error) {
    next(error);
  }
};
