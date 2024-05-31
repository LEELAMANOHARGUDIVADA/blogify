import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import { useToast } from "@/components/ui/use-toast";
import { Link, useNavigate, useParams } from 'react-router-dom';

const UpdateBlog = ({ userId }) => {
  const { id } = useParams(); // Ensure blogId is being captured correctly
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: undefined
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://blogify-api-neon.vercel.app/api/blog/getsingleblog/${id}`);
        if (response.status !== 200) {
          throw new Error("Cannot fetch Blog");
        }
        const fetchedblog = response.data;
        setFormData({
          title: fetchedblog.blog.title,
          description: fetchedblog.blog.description,
          image: fetchedblog.blog.image
        });
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast({
          title: "Error fetching blog",
          description: error.message,
          variant: "destructive",
        });
      }
    };
    fetchBlog();
  }, [id, toast]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value
    }));
    console.log(formData);
  };
  useEffect(() => {
    console.log(formData)
  },[formData])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('image', formData.image);
    data.append('user', userId);

    // Log FormData entries for debugging
    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await axios.put(`http://localhost:8000/api/blog/updateblog/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Response Data:", response.data);


      toast({
        title: "Blog Updated Successfully",
        variant: "success"
      });

      navigate('/myblogs');
    } catch (error) {
      console.error("Error updating blog:", error.response ? error.response.data : error.message);
      toast({
        title: "Error updating blog",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-gray-50 w-full h-screen mb-10 flex flex-col items-center">
      <div className='w-1/3 my-10'>
        <h2 className='text-xl font-bold'>UPDATE BLOG</h2>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col w-1/3'>
        <label className='text-sm font-semibold ml-5'>Blog Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter the blog title"
          required
          className='px-5 py-2.5 mt-2 outline-none border-2 rounded-xl focus:border-gray-800'
        />
        <label className='text-sm font-semibold ml-5 mt-5'>Blog Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter the blog description"
          required
          className='px-5 py-2.5 mt-2 outline-none border-2 rounded-xl h-72 focus:border-gray-800 resize-none'
        ></textarea>
        <div className='w-full mt-5 h-40 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-white rounded-xl' onClick={handleDivClick}>
          <input type="file" name="image" onChange={handleChange} className='hidden' ref={fileInputRef} />
          {formData.image ? <div>
            <h2>Uploaded File</h2>
          </div> : <div>
            <FaCloudUploadAlt size={60} />
          <h3 className='text-xs font-semibold'>SELECT IMAGE FILE TO UPLOAD</h3></div>}
        </div>
        {userId ? (
          <Button className='mt-5'>Update Blog</Button>
        ) : (
          <Link to={`/sign-in`}>
            <Button className='mt-5 w-full'>Login to Update Blog</Button>
          </Link>
        )}
      </form>
    </div>
  );
};

export default UpdateBlog;
