import * as commentsService from "../services/commentsServices.js";




export const getCommentsAndReplies = async (req, res, next) => {
  try {
    const { car } = req.params;
    const result = await commentsService.getCommentsAndReplies({_id: car});
    res.json(result);
  } catch (error) {
    next(error);
  }

}

export const createComment = async (req, res, next) => {
  try {
    const body = req.body;
    const { _id: user } = req.user;
    const result = await commentsService.createComment({
      ...body,
      user,
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export const addReply = async (req, res, next) => {
  try {
    const body = req.body;
    const { _id: user } = req.user;
    const result = await commentsService.addReply({
      ...body,
      user,
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

