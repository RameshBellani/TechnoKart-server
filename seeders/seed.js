const sequelize = require('../config/config');
const User = require('../models/User');
const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const adminUser = await User.create({ username: 'admin', password: 'admin123', role: 'admin' });
  const authorUser = await User.create({ username: 'author', password: 'author123', role: 'author' });
  const readerUser = await User.create({ username: 'reader', password: 'reader123', role: 'reader' });

  const post1 = await BlogPost.create({ title: 'First Post', content: 'Content of the first post', authorId: authorUser.id });
  const post2 = await BlogPost.create({ title: 'Second Post', content: 'Content of the second post', authorId: authorUser.id });

  await Comment.create({ content: 'First comment', postId: post1.id, authorId: readerUser.id });
  await Comment.create({ content: 'Second comment', postId: post2.id, authorId: readerUser.id });

  console.log('Database seeded!');
};

seedDatabase().catch(err => {
  console.error('Error seeding database:', err);
});
