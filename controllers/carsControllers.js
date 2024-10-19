import * as carsService from "../services/carsServices.js";
import HttpError from "../helpers/HttpError.js";


export const getCars = async (req, res, next) => {
  try {
    const result = await carsService.getCars();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

//users
export const getAllUserCars = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await carsService.listCars({ owner });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneCars = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id } = req.params;
    const result = await carsService.getCarByFilter({ owner, _id: id });

    if (!result) {
      throw HttpError(404, `Car with ${id} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await carsService.removeCar({ _id: id, owner });

    if (!result) {
      throw HttpError(404, `Car with ${id} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createCar = async (req, res, next) => {
  try {
    const body = req.body;

    const { _id: owner } = req.user;
    const result = await carsService.addCar({ ...body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateCar = async (req, res, next) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await carsService.updateCar(
      { owner, _id: id },
      body
    );
    if (!result) {
      throw HttpError(404, `Car with ${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateStatusCar = async (req, res, next) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await carsService.updateStatusCar(
      { _id: id, owner },
      body
    );
    if (!result) {
      throw HttpError(404, `Car with ${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
