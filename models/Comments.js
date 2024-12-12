import { Schema, model } from "mongoose";
import { handleDBError, setUpdateSettings } from "./hooks.js";

const replySchema = new Schema(
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
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
);

const commentSchema = new Schema(
  {
    car: {
      type: Schema.Types.ObjectId,
      ref: "car",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    is_deleted:{
      type:Boolean,
      default:false // 默认未撤回
    },
    replies:[replySchema] // 嵌套回复结构
        
  },
  { versionKey: false, timestamps: true }
);
commentSchema.post("save", handleDBError);

commentSchema.pre("findOneAndUpdate", setUpdateSettings);

commentSchema.post("findOneAndUpdate", handleDBError);

const Comments = model("comment", commentSchema);

export default Comments;
