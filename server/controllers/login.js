import { User, validate } from  "../models/user.js";
import bcrypt from "bcrypt";

export const loginUser = async(req, res) => {
    try{
        const { err } = validate(req.body);
        if(err)
          //return res.status(400).send({message: error.details[0].message});
          return res.status(400).json({message: err.details[0].message});

        const user = await User.findOne({ email: req.body.email });
        if(!user)
          //return res.status(401).send({ message: "Invalid Email or Password"});
          return res.status(401).json({ message: "Invalid Email or Password"});

        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        );
        if(!validPassword)
           //return res.status(401).send({ message: "Invalid Email or Password"});
           return res.status(401).json({ message: "Invalid Email or Password"});

           const token = user.generateAuthToken();
        //res.status(200).send({data:token, message: "User Logged in Successfully"});
        res.status(200).json({message: "User Logged in Successfully", user:user, token:token});

    }catch(error){
        //res.status(500).send({ message: "Internal Server Error"});
        res.status(500).json({ message: "Internal Server Error"});
    }
}