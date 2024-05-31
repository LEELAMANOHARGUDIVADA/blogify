import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'

const Login = ({user, setUser, setUserData, userData }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const navigate = useNavigate();
  const { toast } = useToast();

  const handleformData = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('https://blogify-api-neon.vercel.app/api/login', { email, password });
      // console.log(response.data.user._id);
      const userId = response.data.user._id;
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userId', userId);
      console.log(userId);
      setUserData(userId);
      setUser(response.data.token);
      console.log(user)
      navigate(`/`);
      toast({
        title: "Login Successful",
        variant: "success"
      })
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='bg-white w-[420px] h-[480px] shadow-xl rounded-xl flex flex-col items-center justify-center'>
        <form onSubmit={handleformData} className='w-full h-full flex flex-col items-center justify-center gap-10'>
          <div className='mb-5'>
            <h2 className='text-center text-4xl font-semibold'>Login</h2>
          </div>
          <div className='w-full flex flex-col items-center justify-center gap-10'>
            <input type="email" placeholder='Email' className='outline-none w-2/3 border-2 px-4 py-2 border-slate-500 text-sm' onChange={(e) => setEmail(e.target.value)} value={email} required />
            <input type="password" placeholder='Password' className='outline-none w-2/3 border-2 px-4 py-2 border-slate-500 text-sm' onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className='w-2/3 py-3 rounded-full bg-black text-white text-sm'>Login</button>
          <div className='flex items-center justify-center gap-2'>
            <h3 className='text-sm'>Create an Account?</h3>
            <span className='text-sm'><Link to={`/sign-up`}><h3>Signup</h3></Link></span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
