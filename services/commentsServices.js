import Comments from "../models/Comments.js";

export const createComment = (data) => Comments.create(data);

export const addReply = (data) => Comments.updateOne(data.comment, {$push: {replies: data}});


export const getCommentsAndReplies = (data) => {
    const comments = Comments.find(data).sort({created_at: -1}).toArray();

    return comments.map(comment => ({
        ...comment,
        replies: comment.replies.filter(reply => !reply.is_deleted).sort((a, b) => b.created_at - a.created_at) // 过滤并按时间倒序排序
    }));
}