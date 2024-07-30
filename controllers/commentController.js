const BlogPost = require('../models/BlogPost');
const User = require('../models/User');
const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
  const { content, postId } = req.body;

  try {
    
    const post = await BlogPost.findByPk(postId);
    if (!post) return res.status(404).send('Post not found');

    
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).send('User not found');

    
    const comment = await Comment.create({
      content,
      postId,
      authorId: req.user.id,
    });

    res.send(comment);
  } catch (err) {
    res.status(400).send(err);
  }
};
