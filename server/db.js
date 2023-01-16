import mongoose from 'mongoose';

const mongodbUri = 'mongodb://127.0.0.1:27017/jwt-awt'
const connection = () => {
    const connectionParams = {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    };
    try{
        mongoose.connect(mongodbUri, connectionParams);
        console.log("Connected to database successfully");
    }catch(error){
        console.log(error);
        console.log("Could not connect to database");
    }
}

export default connection;