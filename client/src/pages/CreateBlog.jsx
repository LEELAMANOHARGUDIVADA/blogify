import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import { useToast } from "@/components/ui/use-toast"
import { Link, useNavigate } from 'react-router-dom';


const CreateBlog = ({ userId, setUserId }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null // Initialize with null for file
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value // Handle file input separately
        });
    };

    const id = userId

    const {toast} = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('image', formData.image); // Append file
        data.append('user', id);

        try {
            const response = await axios.post('http://localhost:8000/api/blog/createBlog', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            navigate('/')
            toast({
                title: "Blog Posted Successfully",
                variant: "success"
            });
        } catch (error) {
            console.log(error.response ? error.response.data : error.message);
            toast({
                title: error,
                variant: "destructive"
            })
        }

    };

    const fileInputRef = useRef();

    const handleDivClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="bg-gray-50 w-full h-screen mb-10 flex flex-col items-center ">
            <div className='w-1/3 my-10'>
                <h2 className='text-xl font-bold'>CREATE A BLOG</h2>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col w-1/3'>
            <label className='text-sm font-semibold ml-5'>Blog Title</label>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder=""
                required
                className='px-5 py-2.5 mt-2 outline-none border-2 rounded-xl focus:border-gray-800'
            />
            <label className='text-sm font-semibold ml-5 mt-5'>Blog Description</label>
            
            <textarea name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="" required className='px-5 py-2.5 mt-2 outline-none border-2 rounded-xl h-72 focus:border-gray-800 resize-none'></textarea>
            <div className='w-full mt-5 h-40 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-white rounded-xl' onClick={handleDivClick}>
                <input type="file" name="image" onChange={handleChange} required className='hidden ' ref={fileInputRef}  />
                {formData.image ? (
                    <div>{formData.image.name}</div>
                ) : (
                    <div className='flex flex-col items-center justify-center'>
                    <FaCloudUploadAlt size={60} />
                    <h3 className='text-xs font-semibold'>SELECT IMAGE FILE TO UPLAOD</h3>
                    </div>
                )}
            </div>
            {
                userId ? (
                    <Button className='mt-5'>Create Blog</Button>
                ) : (
                    <Link to={`/sign-in`}>
                        <Button className='mt-5 w-full'>Login to Create Blog</Button>
                    </Link>
                )
            }
        </form>
        </div>
    );
};

export default CreateBlog;
