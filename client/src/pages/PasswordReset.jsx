import React from 'react'
import { useState } from 'react'
import { PasswordResetProcess, PasswordResetFailure, PasswordResetStart, PasswordResetSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'



export default function PasswordReset() {
 // const [newPassword, setNewPassword] = useState({});
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const[checkError,setError1]=useState(false);
  const { loading, error } = useSelector((e) => e.user);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
        console.log(formData.password);
      if (formData.password === formData.password1) {
        console.log("le bhai")
        dispatch(PasswordResetStart());
       axios.post('/api/auth/forgotpassword/passwordRest/setpassword', formData)
         .then(res => {
          //  Handle successful response
          console.log("virat");
          dispatch(PasswordResetProcess(formData.password));
           // navigate('/forgotpassword/send'); 
         })
         .catch (err=> {
           console.log("galat hai ye")
         setError1(true);
          })
     
        }
      else
      {
        return dispatch(PasswordResetFailure());
      }

     

    
   

   // e.preventDefault();
//   try{
//   //  setLoading(true);
//     //setError(false);
//   const res = await fetch('/api/auth/forgotpassword/passwordRest/setpassword', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newPassword),
//   });
//  // const data=await res.json();
//   //console.log(newPassword);
//  // setLoading(false);
//   //if(data.success===false)
//  //{ 
//   //setError(true);
//  // return;}
//  // navigate('/signin'); 

// }catch(e){
// // setLoading(false);
//  //setError(true);
//  console.log("le bhai")
// }

  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Reset Password</h1>
      <form className='flex flex-col gap-4'>


      <input
          type='email'
          placeholder='Enter Your Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Enter New Password'
          id='password'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Confirm Password'
          id='password1'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <button
          //  disabled={loading}
          onClick={handleSubmit}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
         
          {loading ? 'Loading...' : 'RESET PASSWORD'}
        </button>

      </form>
      <div className='flex gap-2 mt-5'>




      </div>
      <p className='text-red-700 mt-5  '>{checkError && ' PLease Enter Valid Mail'}</p>
      <p className='text-red-700 mt-5  '>{error && 'Password Not Matched!'}</p>
    </div>
  )
}
