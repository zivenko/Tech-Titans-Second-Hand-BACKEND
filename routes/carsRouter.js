import express from "express";
import {
  getCars,
  getAllUserCars,
  getOneCars,
  deleteCar,
  createCar,
  updateCar,
  updateStatusCar,
} from "../controllers/carsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createCarSchema,
  updateCarSchema,
  updateCarStatusSchema,
} from "../schemas/carsSchemas.js";
import isValidId from "../midlewares/isValidId.js";
import authenticate from "../midlewares/authenticate.js";

const carsRouter = express.Router();
//TODO
carsRouter.get("/", getCars);

carsRouter.use(authenticate);

carsRouter.get("/mycars", getAllUserCars);

carsRouter.get("/:id", isValidId, getOneCars);

carsRouter.delete("/:id", isValidId, deleteCar);

carsRouter.post("/", validateBody(createCarSchema), createCar);

carsRouter.put(
  "/:id",
  isValidId,
  validateBody(updateCarSchema),
  updateCar
);

carsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(updateCarStatusSchema),
  updateStatusCar
);

export default carsRouter;
