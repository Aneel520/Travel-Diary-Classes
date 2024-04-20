// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send({ error: 'Unauthorized' });
  }
};
