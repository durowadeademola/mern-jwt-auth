import express from 'express';
import cors from 'cors';
import connection from './db.js';
import userRoutes from "./routes/signup.js";
import loginRoutes from "./routes/login.js";
import resourceRoutes from "./routes/resource.js";
import dotenv from 'dotenv';

const app = express();
dotenv.config();

//Database connection
connection();

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/signup", userRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/resource", resourceRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));