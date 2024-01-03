const User = require("../models/userModel");
const generateWebToken = require("../utils/generateToken")
const asyncHandler = require("express-async-handler");

// @desc Register a new user
// @route POST api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error("user already exsists");
    }
  
    const user = await User.create({
      name,
      email,
      password,
    });
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
        token: generateWebToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error(" Invalid User data ");
    }
  });



  // @desc Auth user and get a token
// @route POST api/users/login
// @access public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    console.log("Received email:", email);
console.log("Received password:", password);
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id:user._id,
        name:user.name,
        email: user.email,
        isAdmin:user.isAdmin,
        token: generateWebToken(user._id),
      });
      console.log(generateWebToken(user._id));

    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  });
  

  module.exports = {registerUser, authUser}