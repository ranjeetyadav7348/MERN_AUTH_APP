import User from '../model/usermodel.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';


export const test=(req,res)=>
{
    res.json({
        message:'api works now',
    });
};
// update user

export const  updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can update only your account!'));
    }
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profilePictures: req.body.profilePictures,
          },
        },
        { new: true }
      );

      

      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };
  export const deleteUser=async(req,res,next)=>{
    if(req.user.id!==req.params.id)
    {
        return next(errorHandler(401,'you can only delete your account'));
    }
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted.. ');
    }
    catch(error)
    {
        next(error);
    }
  }