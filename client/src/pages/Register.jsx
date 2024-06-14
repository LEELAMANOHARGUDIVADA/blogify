import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from '@/components/ui/use-toast';


const Register = ({user,setUser, setUserData, userData }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    // console.log(formData);
  }, [formData]);

  const navigate = useNavigate();

  const handleformData = async (event) => {
    event.preventDefault();
    const formData = {
      name: name,
      email: email,
      password: password
    };
    setFormData(formData);
    console.log(formData);

    try {
      const response = await axios.post('https://blogify-m8br.onrender.com/api/signup', formData);
      setUserData(response.data.user._id);
      console.log(userId)
      setUser(formData.name);
      navigate('/');
      toast({
        title: "User Created Successfully",
        variant: "success"
      })
    } catch (error) {
      console.error(error.response.data.error);
    }
  }

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='bg-white w-[420px] h-[640px] shadow-xl rounded-xl'>
        <form onSubmit={handleformData} className='w-full h-full flex flex-col items-center justify-center gap-8'>
          <div className='mb-5'>
          <h2 className='text-center text-4xl font-semibold'>Signup</h2>
        </div>
            <div className='w-full flex flex-col items-center justify-center gap-10'>
            <input type="text" placeholder='Name' className='outline-none w-2/3 border-2 px-4 py-2 border-slate-500 text-sm' required onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder='Email' className='outline-none w-2/3 border-2 px-4 py-2 border-slate-500 text-sm' required onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Password' className='outline-none w-2/3 border-2 px-4 py-2 border-slate-500 text-sm' required onChange={(e) => setPassword(e.target.value)}  />
            <input type="password" placeholder='Confirm Password' className='outline-none w-2/3 border-2 px-4 py-2 border-slate-500 text-sm' required />
            </div>
            <button className='w-2/3 py-3 rounded-full bg-black text-white text-sm'>Register</button>
            <div className='flex items-center justify-center gap-2'>
          <h3 className='text-sm'>Already have an Account?</h3>
          <span className='text-sm'><Link to={`/sign-in`}><h3>Signin</h3></Link></span>
        </div>
        </form>
      </div>

    </div>


  )
}

export default Register
