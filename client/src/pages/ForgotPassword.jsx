import { Link, useNavigate } from "react-router-dom";
import { BsEmojiAngry } from 'react-icons/bs';
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { FaSadTear } from "react-icons/fa";
import axios from 'axios'
import { otpData } from '../redux/user/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';


export default function ForgotPassword() {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const dispatch=useDispatch();
  const [formData, setFormData] = useState('');
  const [empty,setEmpty]=useState(false);
  const [myUse,setMyuse]=useState("");
  const[value1,setValue]=useState("");

  // const handlesubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     setError(false);
  //     const res = await fetch('/api/auth/forgotpassword/send', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await res.json();
  //     console.log(data);

  //     if (data.success === false) {
  //       console.log("Validation failed");
  //       return;
  //     }

  //     navigate('/signin');
  //   } catch (error) {
  //     console.error(error);
  //     setError(true);
  //   }
  // }

  //Make sure to check your browser console for any error messages, and that should help you identify the issue. If the problem persists, you may want to provide more information about any error messages you receive or any specific behavior you observe.






  const handleChange = (e) => {


     const name=e.target.id;
     const value=e.target.value;
     setEmpty(false);
    // setMyuse(name);
     setValue(value);
    



     
   //console.log(name);
   
   setFormData({ ...formData, [e.target.id]: e.target.value });
  // setFormData(e.target.value);
     //console.log(formData);
  }
  // // const handleclick=()=>{
  // //   navigate('/forgotpassword/send')
  // // }


  const handlesubmit = (e) => {
    e.preventDefault();
   // console.log("virat");
   
  
  if( value1==='' )
  setEmpty(true);

  console.log("virat is here");
    axios.post('/api/auth/forgotpassword/send', formData)
    .then(res => {
      // Handle successful response
        dispatch(otpData(res.data));
       navigate('/forgotpassword/send'); 
    })
    .catch(error => {
      // Handle error
      
       setError(true);
       
      console.error('Error:', error);
      
    });


    //   const data= res.json();
    //   console.log(data);
    //   console.log("after data code runs");
    //   //setLoading(false);
    //   if(data.success===false)
    //  { //setError(true);
    //   console.log("validation falied")
    //   return;}
    

    // }catch(e){
    // //setLoading(false);
    
    // }
    //console.log(data); 
    
  }




  return (
    <div className='p-3 max-w-lg mx-auto my-24'>
      <h1 className='text-3xl text-center font-semibold my-7'>Forgot Password</h1>
      <form className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='Enter Your Registered Email'
          id='email'
       //  value={formData}
        // onChange={(e)=>setFormData(e.target)}
          className='bg-slate-100 p-3 rounded-lg'
          required="required"
          onChange={handleChange}
        />

        {/* <Link to='/forgotpassword/send'> */}
        <button
          type='button'
          onClick={handlesubmit}
          //   disabled={loading}
          //onClick={handleclick}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        > Forgot

        </button>
        {/* </Link> */}




      </form>
      <div className='flex gap-2 mt-5'>
        You forgot your precious thing <BsEmojiAngry className="gap-2 mt-1.5" />

        <Link to='/signup'>
          <span className='text-blue-500 mx-0'>Sign up</span>
        </Link>
          
       
      </div>
      <h4 className=' flex gap-2 mx-0 my-2  text-red-700 '>{error && `User not Found!!!` }</h4>
      <h4 className=' flex gap-2 mx-0 my-2  text-red-700 '>{empty && `Please fill your Valid Email` }</h4>
    </div>
  )
}
//&& <FaSadTear  className="my-1" />