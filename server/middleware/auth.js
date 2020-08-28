const jwt = require("jsonwebtoken");
const User = require("../models/Users");

//Protect routes
exports.isAuth = async (req, res, next) => {
  //get token from client cookie
  let token = req.cookies.token;
    
  //check if no token
  if (!token) {
    return res.status(401).json({
      success: false,
      error: "No token provided!"
    });
  } 

  try {
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);    
    
    //find decoded id in DB
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized!"
      });
    }
    //if everything ok, pass user to next middleware
    next();
  } catch (error) {
    next(error);
  }
};

exports.isAdmin = (req, res, next) =>{
  //check if user is admin
  if (!req.user.isAdmin) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized!"
    });
  }
  next() 
}
