import { Schema, model } from "mongoose";
import { handleDBError, setUpdateSettings } from "./hooks.js";


const contactsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },  
    is_read: {
      type: Boolean,
      default: false,
    }
  },
  { versionKey: false, timestamps: true }
);
contactsSchema.post("save", handleDBError);

contactsSchema.pre("findOneAndUpdate", setUpdateSettings);

contactsSchema.post("findOneAndUpdate", handleDBError);

const Contacts = model("contact", contactsSchema);

export default Contacts;
