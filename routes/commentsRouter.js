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


// GET /api/comments/ 
commentsRouter.get("/", getCommentsAndReplies);
// POST /api/comments/
commentsRouter.post("/", validateBody(addCommentSchema), createComment);
// POST /api/comments/reply
commentsRouter.post("/reply", validateBody(addReplySchema), addReply);


export default commentsRouter;
