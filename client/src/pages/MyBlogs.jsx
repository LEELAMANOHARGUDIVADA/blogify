import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MdDelete } from "react-icons/md";
import { Edit } from "lucide-react";

const MyBlogs = ({ userId, setUserId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/blog/user-blogs/${userId}`
        );
        if (!response.ok) {
          throw new Error("Cannot fetch Blogs");
        }
        const fetchedBlogs = await response.json();
        setData(fetchedBlogs.userBlogs.blogs);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []);

  const handlePostDelete = async (blogId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/blog/deleteblog/${blogId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Cannot fetch Blog");
      }
      const deleteBlog = await response.json();
      setData(data.filter((blog) => blog._id !== blogId));
      toast({
        title: "Post Deleted",
        variant: "success",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: error,
        variant: "destructive",
      });
    }
  };

  const truncateDescription = (description, wordLimit = 100) => {
    const words = description.split(' ');
    return words.slice(0, wordLimit).join(' ') + (words.length > wordLimit ? '...' : '');
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-2/3">
        <h2 className="text-xl font-bold text-gray-800 mt-10">MY BLOGS</h2>
        {data && data.length > 0 ? (
          data.map((blog, idx) => (
            <div key={idx} className="w-full my-5 flex items-center ">
              <Link to={`/blogs/${blog._id}`} className="w-2/3">
                <img
                  src={`http://localhost:8000/${blog.image}`}
                  alt={blog.image}
                  className="w-96 h-60 object-cover object-center rounded-xl"
                />
              </Link>
              <div className="h-full w-full">
                <h3 className="text-xl font-bold">{blog.title}</h3>
                <h3 className="text-sm text-gray-400">{truncateDescription(blog.description)}</h3>
                <Link to={`/updateblog/${blog._id}`}>
                <Button className="mx-5" variant="outline">
                  <Edit size={15} />
                </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button variant="destructive" className="mt-5">
                      <MdDelete size={15} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your post and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handlePostDelete(blog._id)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))
        ) : (
          <p
            className="mt-10 text-xl font-bold"
            
          >
            No blogs available
          </p>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
