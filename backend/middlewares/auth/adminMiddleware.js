const admin = (req, res, next) => {
  console.log(typeof req.user.email, typeof process.env.SUPER_ADMIN);
  if (
    req.user && 
    req.user.isAdmin === true &&
    req.user.email === process.env.SUPER_ADMIN
  ) {
    next();
  } else {
    return res.status(403).json({ message: 'UnAuthorized. Access denied.' });
  }
};

module.exports = { admin };
