const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const BlogPost = require('./BlogPost');
const User = require('./User');

const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: BlogPost,
      key: 'id',
    },
  },
  authorId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Comment.belongsTo(BlogPost, { foreignKey: 'postId', as: 'post' });
Comment.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

module.exports = Comment;
