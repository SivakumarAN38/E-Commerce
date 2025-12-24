const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // handle both 'authorization' and lower/upper header usage
  const authHeader = req.headers.authorization || req.headers['Authorization'] || req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET || 'secretkey', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    // decoded should contain { id, role }
    req.user = { id: decoded.id, role: decoded.role };
    next();
  });
};

module.exports = authMiddleware;
