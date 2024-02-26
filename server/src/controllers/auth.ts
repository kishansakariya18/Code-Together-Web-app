import express from "express";
// import { registerValidation, loginValidation } from "../validators/Validation"
import jwt from "jsonwebtoken";
import User from "../models/User";


// @route    POST api/register
// @desc     Register User
// @access   Private
export const register = async (req: express.Request, res: express.Response) => {
  // Validation of user
  // const { error } = registerValidation(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  var { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(404).json({ error: "email or passowrd is empty" });
  }

  const userExists = await User.findOne({
    $or: [{ email: email }, { email: email }],
  });
  
  if (userExists)
    return res.status(403).json({
      error: "Username or Email has been taken!",
    });
  else {
    const user = await new User(req.body);
    user.firstName = user.firstName.toLowerCase();
    user.lastName = user.lastName.toLowerCase();
    user.email = user.email.toLowerCase();
    await user.save();
    return res.status(200).json({ message: "Signup success! Please Login..." });
  }
};

// @route    POST api/login
// @desc     Login User
// @access   Private
// @ts-ignore
export const login = (req: express.Request, res: express.Response) => {
  // find the user based on email
  var { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({ error: "email or passowrd is empty" });
  }
  email = email.toLowerCase();
  User.findOne({ email }, (err: any, user: any) => {
    if (err || !user) {
      return res.status(401).json({
        error: "User with that email does not exist. Please Signup.",
      });
    }
    // if user is found make sure the email and pass matches
    //create authenticate method in model and use here.
    if (!user.authenticate(password)) {
      return res.status(403).json({
        error: "Email and password do not match!",
      });
    }

    //generate a token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string);
    //persist response with user and token to frontend client
    // @ts-ignore
    res.cookie("t", token, { expire: new Date() + 9999 });
    //return response with user and token to frontend clients
    const { _id, firstname, email } = user;
    return res.json({ token, user: { _id, email, firstname } });
  });
};

export const signout = (_req: express.Request, res: express.Response) => {
  res.clearCookie("t");
  return res.json({ message: "Signout Success!" });
};