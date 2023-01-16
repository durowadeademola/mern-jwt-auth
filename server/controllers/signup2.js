import {User, validate} from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const saveUser = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });
   
    try {
        const {error} = validate(req.body);
        if(error)
           //return res.status(400).send({message: error.details[0].message});
           return res.status(400).json({message: error.details[0].message});

      await newUser.save();
    } catch {
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
    let token;
    try {
      token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXP_TIME}
      );
    } catch (err) {
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
    res.status(201).json({
        success: true,
        message: "User Created Successfully",
        data: { userId: newUser.id,
            email: newUser.email, token: token },
      });
  }