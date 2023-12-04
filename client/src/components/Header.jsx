import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector} from 'react-redux'

export default function Header() {
  const {currentUser}=useSelector((e)=>e.user);
  return (
    <div className='bg-slate-200'>
   
    <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
      <Link to='/'>
        <h1 className='font-bold'>Auth App</h1>
      </Link>
      <ul className='flex gap-4'>
        <Link to='/'>
          <li>Home</li>
        </Link>
        <Link to='/about'>
          <li>About</li>
        </Link>
         
       
          {currentUser ? (
            <a href='/profile'><img src={currentUser.profilePictures} alt='profile' href='/profile' className='h-7 w-7 rounded-full object-cover' /></a>
          ) : (
            <li> <a href='/signin'> SignIn</a></li>
          )}
      
      </ul>
    </div>
  </div>
  )
}
