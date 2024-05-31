import React from 'react'
import { useToast } from '../ui/use-toast'

const Newsletter = () => {
    const { toast } = useToast();
    const handleToast = (e) => {
        e.preventDefault();
        toast({
            variant: "success",
            title: "Subscribed to Newsletter"
        })
    }
  return (
    <div className='bg-gray-50 w-full h-52 my-20 flex flex-col items-center justify-center'>
        <div className='w-full flex items-center justify-start'>
            <h3 className='text-2xl font-extrabold mx-80 text-gray-800'>Subscribe to newsletter</h3>
        </div>
        <form className='w-full flex items-center justify-center gap-10 '>
            <input type="email" className='w-2/5 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-800 focus:border-2 mt-2 text-sm' placeholder='Enter your email' required />
            <button type='submit' className='px-40 py-4 bg-orange-500 rounded-full text-white shadow-lg font-semibold text-xs hover:bg-white hover:text-orange-500 transition duration-300' onSubmit={handleToast} >SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default Newsletter