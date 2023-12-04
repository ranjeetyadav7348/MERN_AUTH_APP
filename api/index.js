import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import routes from './routes/userroutes.js'
import cookieParser from 'cookie-parser';
import authroute from './routes/authroute.js'
dotenv.config();
mongoose.connect(`mongodb://127.0.0.1:27017/`,{
    useUnifiedTopology: true, useNewUrlParser: true
  }).then(()=>{
    console.log(`connected to DB`);
}).catch((err)=>{
    console.log(err);
});
const app=express();

app.use(express.json());
app.use(cookieParser());


app.use('/api/user',routes);
app.use('/api/auth',authroute);
app.use((err,req,res,next)=>{
    const statuscode=err.statuscode || 500;
    const message =err.message || 'internal server error';
     return res.status(statuscode).json({
        success:false,
        message,
        statuscode
})
})

app.listen(3000,()=>{
    console.log(`server is again runing on port 3000`);
});


