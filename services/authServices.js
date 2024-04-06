import User from "../models/User.js";

export const signup = (data) => User.create(data);
export const findUser = (data) => User.findOne(data);
export const updateUser = (filter, data) => User.findOneAndUpdate(filter, data);
