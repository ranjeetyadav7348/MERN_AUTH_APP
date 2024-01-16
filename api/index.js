import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import routes from './routes/userroutes.js'
import cookieParser from 'cookie-parser';
import authroute from './routes/authroute.js'
import path from 'path'

dotenv.config();
mongoose.connect(`mongodb+srv://yadavranjeet060:yadavranjeet060@auth.phbzaiv.mongodb.net/?retryWrites=true&w=majority`,{
    useUnifiedTopology: true, useNewUrlParser: true
  }).then(()=>{
    console.log(`connected to DB`);
}).catch((err)=>{
    console.log(err);
});
const __dirname=path.resolve();
const app=express();

app.use(express.static(path.join(__dirname,'/client/dist')))
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'));
})

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


