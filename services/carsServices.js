import Cars from "../models/Cars.js";


export const getCars = () =>Cars.find();
export const listCars = (filter) =>
  Cars.find(filter, "-createdAt -updatedAt");
export const addCar = (data) => Cars.create(data);
export const getCarByFilter = (filter) => Cars.findOne(filter);
export const removeCar = (filter) => Cars.findOneAndDelete(filter);
export const updateStatusCar = (filter, data) =>
  Cars.findOneAndUpdate(filter, data);
export const updateCar = (filter, data) =>
  Cars.findOneAndUpdate(filter, data);
