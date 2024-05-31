import React from 'react'
import SimpleSlider from '../components/Carousel/SimpleSlider'
import AllBlogs from '@/components/Blogs/AllBlogs'
import Newsletter from '@/components/Newsletter/Newsletter'

const Home = ({user,setUser, userData, setUserData}) => {
  
  return (
    <div>
      <div className='w-full h-96 flex flex-col items-center justify-center mt-20'>
      {/* <h2 className='text-4xl font-bold text-center mb-10'>Trending</h2> */}
      <div className=' w-3/5'>
      <SimpleSlider />
    </div>
    </div>

    <AllBlogs />
    <Newsletter />
    </div>
  )
}

export default Home