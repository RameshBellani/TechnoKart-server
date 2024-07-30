const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
  const { content, postId } = req.body;
  const comment = new Comment({ content, postId, authorId: req.user.id });

  try {
    const savedComment = await comment.save();
    res.send(savedComment);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getCommentsByPost = async (req, res) => {
  const comments = await Comment.findAll({ where: { postId: req.params.postId }, include: ['author'] });
  res.send(comments);
};

exports.approveComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).send('Comment not found');

    comment.approved = true;
    const updatedComment = await comment.save();
    res.send(updatedComment);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).send('Comment not found');

    await comment.destroy();
    res.send('Comment deleted');
  } catch (err) {
    res.status(400).send(err);
  }
};
