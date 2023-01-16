import {User, validate} from "../models/user.js";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';

dotenv.config();

export const saveUser = async(req, res) => {
    try{
        const {error} = validate(req.body);
        if(error)
           //return res.status(400).send({message: error.details[0].message});
           return res.status(400).json({message: error.details[0].message});

        const user = await User.findOne({ email: req.body.email });
        if(user)
           //return res.status(409).send({message: "User with given email already exist"});
           return res.status(409).json({message: "User with given email already exist."});

           const salt = await bcrypt.genSalt(Number(process.env.SALT));
           const hashPassword = await bcrypt.hash(req.body.password, salt); 
           
           const newUser = await new User({ ...req.body, password:hashPassword }).save();
           const token = newUser.generateAuthToken();
           //res.status(201).send({message: "User created successfully"});
           res.status(201).json({message:"User created successfully", user:newUser, token:token});
    }catch(error){
        //res.status(500).send({message: "Internal Server Error"});
        res.status(500).json({message: "Internal Server Error"});
    }
}