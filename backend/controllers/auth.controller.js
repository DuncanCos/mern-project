const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

exports.register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ id: user._id, username: user.username });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !(await user.comparePassword(req.body.password)))
      return res.status(401).json({ message: 'Bad credentials' });

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) { next(err); }
};
