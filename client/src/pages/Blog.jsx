import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Blog = () => {
  const [blogData, setBlogData] = useState(null); // Initialize as null to handle loading state
  const { id } = useParams(); // Destructure id from useParams

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`https://blogify-api-neon.vercel.app/api/blog/getsingleblog/${id}`);
        if (!response.ok) {
          throw new Error("Cannot fetch Blog");
        }
        const fetchedBlog = await response.json();
        setBlogData(fetchedBlog.blog); // Set the blog data directly
      } catch (error) {
        console.log(error);
      }
    }
    fetchBlog();
  }, [id]);

  if (!blogData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className='w-2/3 h-full flex flex-col items-center justify-center'>
      {blogData.image && <img src={`http://localhost:8000/${blogData.image}`} alt={blogData.title} className='mt-10 ' />}
      <h2 className='text-4xl font-bold my-5 text-gray-800'>{blogData.title}</h2>
      <p className='text-sm font-medium text-gray-600'>{blogData.description}</p>
    </div>
    </div>
  )
}

export default Blog;
