import mongoose from 'mongoose';
import dotenv from 'dotenv';
import crypto from 'crypto';
import jwt from "jsonwebtoken";
import Joi from 'joi';
import passwordComplexity from "joi-password-complexity";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//Generates random JWT_SECRET keys
const buffer = crypto.randomBytes(32);
const secret = buffer.toString('hex');
dotenv.config();

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id:this._id}, 
        process.env.JWT_SECRET, 
        {expiresIn:process.env.JWT_EXP_TIME});
    return token;
}

export const User = mongoose.model("user", userSchema);

export const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password")
    });
    return schema.validate(data);
}