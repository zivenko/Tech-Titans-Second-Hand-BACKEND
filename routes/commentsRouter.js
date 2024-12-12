import express from "express";
import {
  getCommentsAndReplies,
  createComment,
  addReply
} from "../controllers/commentsControllers.js";
import {
  addReplySchema,
  addCommentSchema
} from "../schemas/commentsSchemas.js";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../midlewares/authenticate.js";

const commentsRouter = express.Router();

commentsRouter.use(authenticate);

commentsRouter.get("/", getCommentsAndReplies);
commentsRouter.post("/", validateBody(addCommentSchema), createComment);
commentsRouter.post("/reply", validateBody(addReplySchema), addReply);


export default commentsRouter;
