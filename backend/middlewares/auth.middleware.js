const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    console.log(req.user)
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token mid' });
  }
};
