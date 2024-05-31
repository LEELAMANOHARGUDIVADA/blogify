import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='mt-5'>
      {/* social links */}
      <div className='flex items-center justify-center gap-5'>
      <div className='bg-gray-300 p-3 rounded-xl hover:bg-orange-500 hover:text-white transition duration-300 cursor-pointer'>
          <FaFacebook className='' />
      </div>
      <div className='bg-gray-300 p-3 rounded-xl hover:bg-orange-500 hover:text-white transition duration-300 cursor-pointer'>
          <FaTwitter className=' ' />
      </div>
       <div className='bg-gray-300 p-3 rounded-xl hover:bg-orange-500 hover:text-white transition duration-300 cursor-pointer'>
         <FaLinkedin className=' ' />
       </div>
        <div className='bg-gray-300 p-3 rounded-xl hover:bg-orange-500 hover:text-white transition duration-300 cursor-pointer'>
          <FaInstagram className=' ' />
        </div>
      </div>

      <div className='my-10 text-center'>
        <h4 className='text-xs font-medium text-gray-400'>Copyright &copy;2024 All rights reserved | Developed by Leela Manohar Gudivada</h4>
      </div>



    </div>
  )
}

export default Footer