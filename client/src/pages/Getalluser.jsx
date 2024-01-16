import React from 'react'
import { useState,useEffect } from 'react'
import { PasswordResetProcess, PasswordResetFailure, PasswordResetStart, PasswordResetSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'



export default function Getalluser() {
 // const [newPassword, setNewPassword] = useState({});
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const[checkError,setError1]=useState(false);
  const { loading, error } = useSelector((e) => e.user);

  useEffect(() => {
    // Code to load something (e.g., fetch data from an API)
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();

    // Cleanup function (optional): If you need to perform cleanup when the component unmounts
    return () => {
      // Cleanup code here (e.g., clearing subscriptions, timers, etc.)
    };
  }, []);


     
      //  axios.get('/api/auth/admin')
      //    .then(res => {
      //     //  Handle successful response
      //    // console.log("virat");
      //     dispatch(userAllDetail(res.user));
      //      // navigate('/forgotpassword/send'); 
      //    })
      //    .catch (err=> {
      //      console.log("galat hai ye")
      //    setError1(true);
      //     })
     
      //   }
  
 

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Reset Password</h1>
      <form className='flex flex-col gap-4'>


      <input
          type='email'
          placeholder='Enter Your Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg'
        
        />
        <input
          type='password'
          placeholder='Enter New Password'
          id='password'
          className='bg-slate-100 p-3 rounded-lg'
        
        />
        <input
          type='password'
          placeholder='Confirm Password'
          id='password1'
          className='bg-slate-100 p-3 rounded-lg'
        
        />
        <button
          //  disabled={loading}
        
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
