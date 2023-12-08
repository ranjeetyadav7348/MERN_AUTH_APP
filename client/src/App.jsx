import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import Signin from './pages/Signin'
import About from './pages/About'
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import Result from './pages/Otp';
import PasswordReset from './pages/PasswordReset';

export default function App() {
  return (
     <BrowserRouter>
     <Header/>
     <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/about" element={<About/>}/>
     <Route path="/profile" element={<Profile/>}/>
     <Route path="/signin" element={<Signin/>}/>
     <Route path="/signup" element={<SignUp/>}/>
     <Route path="/forgotpassword" element={<ForgotPassword/>}/>
     <Route path="/forgotpassword/send" element={<Result/>}  />
     <Route path="/forgotpassword/passwordReset" element={<PasswordReset/>}  />
     <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
    

     </Routes>

     </BrowserRouter>
  )
}
