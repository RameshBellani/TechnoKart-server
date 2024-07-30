const BlogPost = require('../models/BlogPost');
const User = require('../models/User');

exports.createPost = async (req, res) => {
  const { title, content, status } = req.body;
  const post = new BlogPost({ title, content, status, authorId: req.user.id });

  try {
    const savedPost = await post.save();
    res.send(savedPost);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getPosts = async (req, res) => {
  const posts = await BlogPost.findAll({ include: [{ model: User, as: 'author' }] });
  res.send(posts);
};

exports.getPostById = async (req, res) => {
  const post = await BlogPost.findByPk(req.params.id, { include: [{ model: User, as: 'author' }] });
  if (!post) return res.status(404).send('Post not found');
  res.send(post);
};

exports.updatePost = async (req, res) => {
  const { title, content, status } = req.body;

  try {
    const post = await BlogPost.findByPk(req.params.id);
    if (!post) return res.status(404).send('Post not found');

    post.title = title;
    post.content = content;
    post.status = status;
    post.updatedAt = new Date();

    const updatedPost = await post.save();
    res.send(updatedPost);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findByPk(req.params.id);
    if (!post) return res.status(404).send('Post not found');

    await post.destroy();
    res.send('Post deleted');
  } catch (err) {
    res.status(400).send(err);
  }
};
