import { User, validate } from  "../models/user.js";
import Joi from "joi";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

export const loginUser = async (req, res, next) => {
    let { email, password } = req.body;
   
    let existingUser;
    try {
        const { e } = validate(req.body);
        if(e)
          //return res.status(400).send({message: error.details[0].message});
          return res.status(400).json({message: e.details[0].message});
      existingUser = await User.findOne({ email: email });
    } catch {
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
    if (!existingUser || existingUser.password != password) {
      const error = Error("Wrong details please check at once");
      return next(error);
    }
    let token;
    try {
      //Creating jwt token
      token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXP_TIME }
      );
    } catch (err) {
      console.log(err);
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
   
    res.status(200).json({
        success: true,
        message: "User logged In Scuccessfully",
        data: {
          userId: existingUser.id,
          email: existingUser.email,
          token: token,
        },
      });
  }