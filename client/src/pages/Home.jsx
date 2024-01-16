import React from 'react'
import './Home.css'

export default function Home() {
  return (
    <div className='main'>
    <div className= 'px-0 py-24 max-w-2xl mx-60'>
      <h1 className='text-3xl font-bold  mb-4 text-slate-100'>
        Welcome to my Auth App!
      </h1>
      <p className='mb-4 text-slate-100'>
        This is a full-stack web application built with the MERN (MongoDB,
        Express, React, Node.js) stack. It includes authentication features that
        allow users to sign up, log in, and log out, and provides access to
        protected routes only for authenticated users.
      </p>
      <p className='mb-4 text-slate-100'>
        The front-end of the application is built with React and uses React
        Router for client-side routing. The back-end is built with Node.js and
        Express, and uses MongoDB as the database. Authentication is implemented
        using JSON Web Tokens (JWT).
      </p>
      <p className='mb-4 text-slate-100'>
        This application is intended as a starting point for building full-stack
        web applications with authentication using the MERN stack. Feel free to
        use it as a template for your own projects!
      </p>
    </div>
    

    </div>
  )
}
