// backend/authentication/isAuthor.js
const User = require('../models/User');

module.exports = async function isAuthor(req, res, next) {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    // double-check role from DB in case token was tampered with
    const user = await User.findById(req.user.userId).select('role');
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    // Accept 'author' as permission to create/delete novels.
    // If you later want to keep an 'admin' role as well, you can allow user.role === 'admin' too.
    if (user.role !== 'author') {
      return res.status(403).json({ success: false, message: 'Forbidden: authors only' });
    }

    next();
  } catch (err) {
    console.error('isAuthor error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
