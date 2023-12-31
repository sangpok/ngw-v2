import Comment from '../models/comments.js';

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({}).select('-userPassword');
    return { comments };
    // res.status(200).json({ comments });
  } catch (error) {
    throw { error };
    // res.status(500).json({ msg: error });
  }
};

const getCommentsByPage = async (currentPage, newCount) => {
  // const currentPage = req.query.page || 1;

  try {
    const comments = await Comment.find({})
      .sort({ commentDate: 'desc' })
      .skip((currentPage - 1) * 10 - newCount)
      .limit(10)
      .select('-userPassword');

    comments.sort((a, b) => a.commentDate - b.commentDate);

    // res.status(200).json({ comments });
    return { comments };
  } catch (error) {
    // res.status(500).json({ msg: error });
    throw { error };
  }
};

const createComment = async (commentData) => {
  try {
    const comment = await Comment.create(commentData);
    // res.status(201).json({ comment });
    return comment;
  } catch (error) {
    // res.status(500).json({ msg: error });
    throw { error };
  }
};

const getComment = async (commentId) => {
  try {
    const comments = await Comment.find({ _id: commentId }).select('-userPassword');
    // res.status(200).json({ comments });
    return { comments };
  } catch (error) {
    // res.status(500).json({ msg: error });
    throw { error };
  }
};

const updateComment = async (messageId, emojiId) => {
  try {
    const comment = await Comment.findById(messageId);
    // console.log(comment);
    const commentReactions = comment.commentReactions;

    if (!commentReactions.length) {
      comment.commentReactions.push({ icon: emojiId, count: 1 });
    } else {
      const reactionIndex = comment.commentReactions.findIndex(
        (value) => value.icon === emojiId.toString()
      );

      if (reactionIndex !== -1) {
        comment.commentReactions[reactionIndex].count++;
      } else {
        comment.commentReactions.push({ icon: emojiId, count: 1 });
      }
    }

    // console.log(comment);
    await comment.save();

    return comment;

    // res.status(200).json({ comment });
    return { comment };
  } catch (error) {
    // res.status(500).json({ msg: error });
    throw { error };
  }

  // console.log(req);
};

const deleteComment = async (commentId) => {
  try {
    const comment = await Comment.findOneAndDelete({ _id: commentId });
    // res.status(200).json({ comment });
    return comment;
  } catch (error) {
    // res.status(500).json({ msg: error });
    throw { error };
  }
};

const compareCommentPassword = async (commentId, password) => {
  try {
    const commentPassword = await Comment.find({ _id: commentId }).select('userPassword');
    return { compare: password === commentPassword[0].userPassword };
  } catch (error) {
    // res.status(500).json({ msg: error });
    throw { error };
  }
};

export {
  getAllComments,
  getCommentsByPage,
  createComment,
  getComment,
  updateComment,
  deleteComment,
  compareCommentPassword,
};
