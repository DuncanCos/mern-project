const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();


exports.register = async (req, res, next) => {
  console.log("REQ BODY REGISTER >>>", req.body);

  try {
    const { username, mail, password } = req.body;

    if (!username || !mail || !password) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const userExists = await User.findOne({ $or: [{ username }, { mail }] });
    if (userExists)
      return res.status(400).json({ message: 'Username ou email déjà utilisé.' });

    //const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, mail, password: password });

    res.status(201).json({ id: user._id, username: user.username });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  console.log("REQ BODY LOGIN >>>", req.body);
  
  try {
    const user = await User.findOne({ mail: req.body.mail });
    console.log(user);
    if (!user || !(await user.comparePassword(req.body.password)))
      return res.status(401).json({ message: 'Bad credentials' });

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) { next(err); }
};