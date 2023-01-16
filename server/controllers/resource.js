import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const userResource = (req, res) => {  
    const token = req.headers.authorization.split(' ')[1]; 
    //Authorization: 'Bearer TOKEN'
    if(!token)
        res.status(200).json({success:false, message: "Error! Token was not provided."});
    //Decoding the token
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
    res.status(200).json({
        message: "Data retrieved successfully",
        success:true, 
        data:{userId:decodedToken._id, 
            email:decodedToken.email,
        firstName: decodedToken.firstName,
    lastName: decodedToken.lastName}
    });   
}