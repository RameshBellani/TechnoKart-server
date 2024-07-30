const express = require('express');
const cors = require('cors');
const sequelize = require('./config/config');
const authRoutes = require('./routes/auth');
const blogPostRoutes = require('./routes/blogPost');
const commentRoutes = require('./routes/comment');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
const corsOptions = {
  origin: '*', 
  methods: 'GET,POST,PUT,DELETE',
};

app.use(cors(corsOptions));

app.use('/api/auth', authRoutes);
app.use('/api/posts', blogPostRoutes);
app.use('/api/comments', commentRoutes);

sequelize.sync().then(() => {
  console.log('Database synchronized');
}).catch((err) => {
  console.error('Error synchronizing database:', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
