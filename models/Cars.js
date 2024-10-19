import { Schema, model } from "mongoose";
import { handleDBError, setUpdateSettings } from "./hooks.js";
const carsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set car name, pls"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

carsSchema.post("save", handleDBError);

carsSchema.pre("findOneAndUpdate", setUpdateSettings);

carsSchema.post("findOneAndUpdate", handleDBError);

const Cars = model("cars", carsSchema);

export default Cars;
