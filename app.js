import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import authRouter from "./routes/authRouter.js";
import carsRouter from "./routes/carsRouter.js";
import commentsRouter from "./routes/commentsRouter.js";
import contactsRouter from "./routes/contactsRouter.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/cars", carsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, _, res)=> {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(process.env.PORT, () => {
      console.log(
        `Server is running. Use our API on port: ${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
