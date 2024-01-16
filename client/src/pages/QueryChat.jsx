import React from 'react'
import { useState } from 'react'
import {QuerytStart,QuerytFailure, PasswordResetProcess, PasswordResetFailure, PasswordResetStart, PasswordResetSuccess, QueryResponse } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import './QueryChat.css'
// ... (previous imports)

export default function QueryChat() {
  const [formData, setFormData] = useState({});
 
  const { QueryRes, loading, error } = useSelector((e) => e.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    dispatch(QuerytStart());

    try {
      const res = await axios.post('/api/auth/chat', formData);

      console.log(formData);
      const jsonString = res.data;
      const data1 = JSON.parse(jsonString);
   
      dispatch(QueryResponse(data1));

      // Clear the form data after successful submission
      setFormData({});
    } catch (err) {
      dispatch(QuerytFailure());
    }
  };

  const renderedData = Object.keys(QueryRes).map((key) => (
    <p key={key}>
      <strong>{key}:</strong> <p>{QueryRes[key]}</p>
    </p>
  ));

  return (
    <div className='Hero p-6 max-w-1 mx-auto'>
      <h4 className='text-2xl text-center font-semibold my-4'>Query Processing</h4>
      <form className='flex flex-col gap-2'>
        <input
          type='text'
          placeholder={ 'Enter Your Query'  }
          id='text'
          className='bg-slate-100 p-2 rounded-lg'
         value={formData.text || ''} // Use value prop to bind input to formData.text
          onChange={handleChange}
        />
        <button
          disabled={loading}
          onClick={handleSubmit}
          className='bg-slate-600 text-white p-1.5 rounded-lg uppercase hover:opacity-80 disabled:opacity-80'
        >
          {loading ? 'SENDING...' : 'SEND'}
        </button>
      </form>
      <div className='flex gap-2 mt-3'>
      <h2 className='flex gap-5 mt-5 '>{renderedData}</h2>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went Wrong!'}</p>
    </div>
  );
}




// export default function QueryChat() {
//  // const [newPassword, setNewPassword] = useState({});
//   const [formData, setFormData] = useState();
  
// //   const dispatch = useDispatch();

//   const[CheckPlaceholder,setPlaceholder]=useState(true);
//   const { QueryRes,loading, error } = useSelector((e) => e.user);
  

// const dispatch=useDispatch();
  
// const handleChange = (e) => {
//   setFormData({ ...formData, [e.target.id]: e.target.value });
 
//  }
 

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//    //  console.log(formData);
//    setPlaceholder(false);
//    dispatch(QuerytStart());
//        axios.post('/api/auth/chat', formData)
//          .then(res => {
         
//       //  console.log(res);
//          const jsonString = res.data;

// // Parse the JSON string into a JavaScript object
//         const data1 = JSON.parse(jsonString);
//         // console.log(data1);
//         setPlaceholder(true);
//          dispatch(QueryResponse(data1));
         
//          })
//          .catch (err=> {
//           dispatch(QuerytFailure());

//           })
     
      
  

//   }
//   const renderedData = [];

//   // Use forEach to push JSX elements into the array
//   Object.keys(QueryRes).forEach(key => {
//     renderedData.push(
//       <p key={key}>
//         <strong>{key}:</strong> {QueryRes[key]}
//       </p>
//     );
//   });







//   return (
//     <div className='Hero p-6 max-w-1 mx-auto'>
//       <h4 className='text-2xl text-center font-semibold my-4'>Query Processing</h4>
//       <form className='flex flex-col gap-2'>


//       <input
//           type='text'
//           placeholder=  { CheckPlaceholder && 'Enter Your Query'}
//           id='text'
//          // value={formData}
//           className='bg-slate-100 p-2 rounded-lg'
//           onChange={handleChange}
//         />
        
//         <button
//             disabled={loading}
//           onClick={handleSubmit}
//           className='bg-slate-600 text-white p-1.5 rounded-lg uppercase hover:opacity-80 disabled:opacity-80'
//         >
         
//           {loading ? 'SEDNING...' : 'SEND'}
//         </button>

//       </form>
//       <div className='flex gap-2 mt-5'>


    
// {/* //IT'S A COMPLETE ARRAY THAT SHOW THE VALUE */}
// <h6>{renderedData}</h6>
     

//       </div>
//       {/* {/* <p className='text-red-700 mt-5  '>{checkError && ' PLease Enter Valid Mail'}</p> */}
//       <p className='text-red-700 mt-5  '>{error && 'Something went Wrong!'}</p> 
//     </div>
//   )
// }