import Joi from "joi";

// 定义回复的验证模式
export const addReplySchema = Joi.object({
  comment: Joi.string().required(), // 父评论ID
  user: Joi.string().required(), // 用户ID
  content: Joi.string().required(), // 回复内容
  created_at: Joi.date().default(Date.now), // 创建时间
});

// 定义评论的验证模式
export const addCommentSchema = Joi.object({
  car: Joi.string().required(), // 汽车ID
  user: Joi.string().required(), // 拥有者ID
  content: Joi.string().required(), // 评论内容
  created_at: Joi.date().default(Date.now), // 创建时间
  is_deleted: Joi.boolean().default(false), // 是否已删除，默认未删除
});

