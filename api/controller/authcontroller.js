import User from "../model/usermodel.js";

import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import OpenAI from "openai";

import { errorHandler } from "../utils/error.js";
import { sendMail } from "./Mail.js";
import { Schema } from "mongoose";


dotenv.config();

export const  signup =async(req,res,next)=>{
    const {username,email,password} =req.body;
  //  console.log(req.body);
    const hashedpassword=bcryptjs.hashSync(password,10);
    const newUser=new User({username,email,password:hashedpassword});
  
   try{ await newUser.save()
     res.status(201).json({message:"user created success"});
   }catch(error){
   
    next(error);
   }
    
}

export const  PasswordReset =async(req,res,next)=>{
//console.log("hello")
  try {
   
    //WHATEVER WRITTEN IN BRACE TAKE AS DESTRUCTURING OF OBJECT OR VALUE
    const {email}=req.body;
    const pass=req.body.password;

    //HERE VALID USER AFTER FINDONE IT JUST GET RETURN THE WHOLE MONGODB OBJECT
    const validUser=await User.findOne({email});
   // console.log(req.body.password);

   if(!validUser)
   return next(errorHandler(404,'User Not Found'));
    
       const encrypted= bcryptjs.hashSync(pass, 10);
       //_id=validUser._id;
//  console.log(validUser);

    const updatedUser = await User.findByIdAndUpdate(
      validUser._id,
      {
        $set: {
          
          password: encrypted,
         
        },
      },
      { new: true }
    );
   // console.log(updatedUser);
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
  
}




export const  signin =async(req,res,next)=>{
  const {email,password} =req.body;
  console.log(req.body);
  // const hashedpassword=bcryptjs.hashSync(password,10);
  // const newUser=new User({username,email,password:hashedpassword});

 try{ 
  const validUser=await User.findOne({email});
  if(!validUser)
  return next(errorHandler(404,'user not found'));
const validPassword=  bcryptjs.compareSync(password,validUser.password);
if(!validPassword)
return next(errorHandler(401,'wrong credentials'));
const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET);
const {password:hashedPassword,...virat}=validUser._doc;
res.cookie('access_token',token,{httpOnly:true}).status(200).json(virat)

 }catch(error){
  next(error);
 }
  
}




export const  verify =async(req,res,next)=>{
  const email =req.body.email;
 

 try{ 
  const validUser=await User.findOne({email});
  if(!validUser)
  return next(errorHandler(404,'user not found'));
   
  
 res.status(200).json("user validation successful");

 }catch(error){
  next(error);
 }
  
}


export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePictures: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signout=(req,res)=>{
  res.clearCookie('access_token').status(200).json('SiginOut success');
}




export  const Chatgpt=async(req,res)=>{
  try{
   
    const openai = new OpenAI({
      apiKey:`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`,
    });
    const {text}=req.body;
     
    const schema={
      type:"object",
      properties:{
        Summary:{
          type:"string",
          description:"summerize the this content into 3-4 efficient line"
        }
      },
      required:["Summery"]
    }

    
    const response = await openai.chat.completions.create({
      
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "assistant",
          "content":`${text}`
        }
      ],
      functions:[
         {  name: "detail",
            "parameters":schema

        }
      ],
      function_call:{name:"detail"},
      temperature: 0,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.status(200).json(response.choices[0].message.function_call.arguments);
  }
  catch{
    res.status(500).json("chatgpt not run")
  }
}


export const getallPosts = async (req, res, next) => {
  try {
    // Destructuring the values from req.body
    const { postText } = req.body;
    const email = req.body.currentUser.email;

    // Finding a user based on the email obtained from the request body
    const validUser = await User.findOne({ email });
    // console.log(validUser)

    // Updating the user's document in the database
    const posted = await User.findByIdAndUpdate(
      validUser._id,
      {
        $set: {
          post: postText,
        },
      },
      { new: true }
    );


    const value=await User.find();
    // Destructuring the post property from the updatedUser object
    // const { post, ...rest } = posted._doc;

    // Sending the response with the user details (excluding the post property)
    const responseData = value.map(item => item.post);
    // console.log(responseData);
    res.status(200).json(responseData);
  } catch (error) {
    // Handling any errors that might occur during the process
    next(error);
  }
};



