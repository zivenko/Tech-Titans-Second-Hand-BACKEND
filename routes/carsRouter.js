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

// GET /api/cars/
carsRouter.get("/", getCars);

carsRouter.use(authenticate);

// GET  /api/cars/mycars
carsRouter.get("/mycars", getAllUserCars);
// GET  /api/cars/:id
carsRouter.get("/:id", isValidId, getOneCars);
// DELETE  /api/cars/:id
carsRouter.delete("/:id", isValidId, deleteCar);
// POST  /api/cars/
carsRouter.post("/", validateBody(createCarSchema), createCar);
// PUT  /api/cars/:id
carsRouter.put(
  "/:id",
  isValidId,
  validateBody(updateCarSchema),
  updateCar
);
// PATCH  /api/cars/:id/favorite
carsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(updateCarStatusSchema),
  updateStatusCar
);

export default carsRouter;
