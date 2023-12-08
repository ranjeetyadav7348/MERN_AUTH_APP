import React from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import {  useSelector } from 'react-redux'


export default function Otp() {

  const navigate=useNavigate();

  const [formData,setFormData]=useState(undefined);
  const [Error,setError]=useState(false);
  const {val}=useSelector((e)=>e.user);


 
  const handleSubmit=(e)=>{
    e.preventDefault();
   //console.log(val);
   setError(false);
     if(val==formData)
     navigate('/forgotpassword/passwordReset/')
    else{
      setError(true);
    }
     


  }
  return (
    <div className='p-3 max-w-lg mx-auto my-24'>
    <h1 className='text-3xl text-center font-semibold my-7'>Forgot Password</h1>
    {/* <h5  className='text-0xl text-center font-semibold my-7 col green' >Congrats you write a valid mail</h5> */}
    <form className='flex flex-col gap-4'>
      <input
        type='email'
        placeholder='Enter valid OTP '
        id='email'
     //  value={formData}
       onChange={(e)=>setFormData(e.target.value)}
        className='bg-slate-100 p-3 rounded-lg'
        required="required"
      //  onChange={handleChange}
      />

      {/* <Link to='/forgotpassword/send'> */}
      <button
        type='button'
         onClick={handleSubmit}
        //   disabled={loading}
        //onClick={handleclick}
        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
      > Verify

      </button>
      {/* </Link> */}




    </form>
    <div className='flex gap-2 mt-5'>
      OTP is send Successfully to Email

      <Link to='/signup'>
        <span className='text-blue-500 mx-0'>Resend</span>
      </Link>
      <Link>
      <span className='text-blue-500  mx-4'>Try another way</span>
      </Link>
      
        
     
    </div>
    <h4 className=' flex gap-2 mx-0 my-2  text-red-700 '>{Error && `Please Check Your OTP!!!` }</h4>
    {/* <h4 className=' flex gap-2 mx-0 my-2  text-red-700 '>{empty && `Please fill your Valid Email` }</h4> */}

 </div> 
  )
}
