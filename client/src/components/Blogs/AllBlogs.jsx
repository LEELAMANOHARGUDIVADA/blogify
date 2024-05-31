import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Skeleton } from '../ui/skeleton';

const AllBlogs = () => {
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://blogify-api-neon.vercel.app/api/blog/getallblogs",
                                     headers: {
                                      'Content-Type': 'application/json',
                                     },
                                     credentials: 'include',
          );
        if (!response.ok) {
          throw  new Error("Cannot fetch Blogs")
        }
        const fetchedBlogs = await response.json();
        setData(fetchedBlogs.blogs);   
        // console.log(data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchBlogs();
  }, []);


  

  return (
    <div className='w-full flex items-center justify-center gap-20 my-40'>
      {/* {data && data.length > 0 ? (
        data.map((blog, idx) => (
          <div key={idx} className='mt-20'>
            <h1>{blog.title}</h1>
            <h2>{blog.description}</h2>
            <img src={`http://localhost:8000/${blog.image}`} alt={blog.image} />
          </div>
        ))
      ) : (
        <p>No blogs available</p>
      )} */}

      <div className='w-2/3 grid grid-cols-3 items-center justify-center gap-10'>
      
      {data && data.length > 0 ? (
        data.map((blog,idx) => (
          <Link to={`/blogs/${blog._id}`}>
            <div key={idx} className='h-96 overflow-hidden'>
        <img src={`http://localhost:8000/${blog.image}`} alt={blog.image}  className='w-96 h-56 object-cover object-center rounded-xl' />
        
        <h3 className='text-xl font-bold mt-2'>{blog.title}</h3>
        <h4 className="text-gray-400 text-sm">{blog.description}</h4>
      </div>
          </Link>
        ))
      ) : (
        <div className=' w-full grid grid-cols-3 justify-evenly  gap-96'>
          <div>
          <Skeleton className="h-56 w-[350px] rounded-xl" />
          <div className="space-y-2 mt-2">
        <Skeleton className="h-6 w-80" />
        <Skeleton className="h-5 w-72" />
      </div>
        </div>
          <div>
          <Skeleton className="h-56 w-[350px] rounded-xl" />
          <div className="space-y-2 mt-2">
        <Skeleton className="h-6 w-80" />
        <Skeleton className="h-5 w-72" />
      </div>
        </div>
          <div>
          <Skeleton className="h-56 w-[350px] rounded-xl" />
          <div className="space-y-2 mt-2">
        <Skeleton className="h-6 w-80" />
        <Skeleton className="h-5 w-72" />
      </div>
        </div>
        </div>
      )}



     </div>
    </div>
  )
}

export default AllBlogs
