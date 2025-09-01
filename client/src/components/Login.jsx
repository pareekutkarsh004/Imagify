import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useEffect } from "react";
import { AppContext } from '../context/AppContext';
import {motion} from 'framer-motion'

function Login() {
    const [state,setState] = useState('Login')
    const {setShowLogin} = useContext(AppContext);

useEffect(() => {
  // Disable scrolling when component mounts
  document.body.style.overflow = "hidden";

  // Cleanup: restore scrolling when component unmounts
  return () => {
    document.body.style.overflow = "unset";
  };
}, []);

  return (
    <motion.div
     initial={{ opacity: 0.2, y: 50 }}
  transition={{ duration: 0.3 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}  
     className='fixed top-0 left-0 right-0 bottom-0 z-10
    backdrop-blur-sm bg-black/30 flex justify-center items-center'> 
    
   <form className='relative bg-white p-10 rounded-xl text-slate-500'>
      <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
      <p className='text-sm'>Welcome back! Please sign in to continue</p>

      {state==='Sign Up' && <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
        <img src={assets.profile_icon} alt="" className="w-5 h-5 opacity-70"  />
        <input
          type="text"
          className='outline-none text-sm'
          placeholder='Full Name'
          required
        />
      </div>}
      <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
        <img src={assets.email_icon} alt="" className="w-5 h-5 opacity-70"  />
        <input
          type="email"
          className='outline-none text-sm'
          placeholder='Email id'
          required
        />
      </div>
      <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
        <img src={assets.lock_icon} alt="" className="w-5 h-5 opacity-70"  />
        <input
          type="password"
          className='outline-none text-sm'
          placeholder='password'
          required
        />
      </div>
      <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot password?</p>
      <button className='bg-blue-600 w-full text-white py-2 rounded-full'>{state=='Login' ? 'Login' :'create account'}</button>
      {state==='Login' ? <p className='mt-5 text-center'>Don't have an account? <span onClick={()=>setState('Sign Up')} className='text-blue-600 cursor-pointer'>Sign up</span></p>:
       <p className='mt-5 text-center'>Already have an account? <span onClick={()=>setState('Login')} className='text-blue-600 cursor-pointer'>Login</span></p>
      }
      

      <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer' />
    </form>

    </motion.div>
  )
}

export default Login