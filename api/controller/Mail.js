import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import { verify } from './authcontroller.js';
import { errorHandler } from '../utils/error.js';
import User from '../model/usermodel.js';





export const sendMail=async(req,res,next)=>{

  //console.log("virat is here");
  //console.log(req.body);
  const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:'yadavranjeet060@gmail.com',
      pass:'wpwouecyhgiwcumw'

     // user:'durgeshchaudhary020401@gmail.com',
     // pass:'lqfxwpogsaocehjc'

    }
  })

// configure mail





const email =req.body.email;
 

//  try{ 
//   const validUser=await User.findOne({email});
//   if(!validUser)
//   return next(errorHandler(404,'user not found'));
   
  
//  res.status(200).json("user validation successful");

//  }catch(error){
//   next(error);
//  }

const val=Math.floor(100000 + Math.random() * 900000);
const mailOptions={
  from:'yadavranjeet060@gmail.com',
  to:email,
  subject:'just checking',
  text:`Your Verification OTP is: ${val}`
}
console.log("ufiaejwkl");

try {
  const validUser=await User.findOne({email});
  if(!validUser)
  return next(errorHandler(404,'user not found1'));
  const result=await transporter.sendMail(mailOptions);

 
  //console.log(validUser);
  
   
  
  res.status(200).json(val);

  // console.log("email sent success");
  //res.status(200).json("send successfully");
} catch (error) {
  
  console.log("failed to send the mail ",error);
}
}



// router.post("/sendMail", async (req, res) => {
//   const { email, text, subject } = req.body;
//   // console.log(req.body)
//   var Useremail = {
//       body: {
//           intro: text || "Welcome to Loadkro",
//           outro: 'Need help, or have question? Just reply to this email'
//       }
//   }
//   var emailBody = MailGenerator.generate(Useremail);
//   let message = {
//       from: " durgeshchaudhary020401@gmail.com",
//       to: email,
//       subject: subject || "Successfull done",
//       html: emailBody
//     }
//     transporter.sendMail(message)
//         .then(() => {
//             return res.status(200).send({ msg: "You should receive an email from Us. " })
//         })
// })
      

// email config
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//       user: "durgeshchaudhary020401@gmail.com",
//       pass: "lqfxwpogsaocehjc"
//   }
// })

// let MailGenerator = new Mailgen({
//   theme: "default",
//   product: {
//       name: "Mailgen",
//       link: "https://mailgen.js/"
//   }
// })

// export const sendMail=async(req,res)=>{

//   const { email, text, subject } = req.body;
//      //console.log(req.body)
//     var Useremail = {
//         body: {
//             intro: text || "Welcome to Loadkro",
//             outro: 'Need help, or have question? Just reply to this email'
//         }
//     }
//     var emailBody = MailGenerator.generate(Useremail);
//     let message = {
//         from: " durgeshchaudhary020401@gmail.com",
//         to: email,
//         subject: subject || "Successfull done",
//         html: emailBody
//       }
//       transporter.sendMail(message)
//           .then(() => {
//               return res.status(200).send({ msg: "You should receive an email from Us. " })
//           })



// }