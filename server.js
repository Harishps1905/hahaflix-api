import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import router from './routes/UserRoutes.js';
dotenv.config();

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
// Access environment variables
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const uri = `mongodb+srv://${dbUser}:${dbPassword}@clusterhahaflix.w242ora.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{app.listen(port);})
    .then(()=>{console.log('db is connected successfully!!!!');})
    .catch((err)=>{console.log(err);})



app.use('/api/user', router);