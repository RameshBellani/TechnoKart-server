const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();


exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({ username, password: hashedPassword, role });

  const token = jwt.sign(
    { _id: newUser._id, role: newUser.role },
    process.env.TOKEN_SECRET,
    { expiresIn: '1h' }
  );

  res.header('Authorization', `Bearer ${token}`).send(token);
};


exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(400).send('Username or password is wrong');

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.TOKEN_SECRET,
    { expiresIn: '1h' }
  );

  res.header('Authorization', `Bearer ${token}`).send(token);
};
