import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SlMagnifier } from "react-icons/sl";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";

const Header = ({ username, setUserName, userId, setUserId }) => {
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
  }
  return (
    <header className="sticky w-full z-10 bg-white top-0 h-16 shadow-sm flex items-center justify-center">
      <div className="w-full flex items-center justify-evenly">
        <div className=" w-72 px-3 py-2 rounded-full border border-gray-300 focus:border-gray-800 flex items-center justify-center gap-2">
          <SlMagnifier className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full text-sm bg-transparent outline-none"
          />
        </div>
        <div>
          <Link to={`/`}><h1 className="font-bold text-xl ml-20">BLOGIFY</h1></Link>
        </div>
        <div className="flex items-center justify-center gap-5">
          <Link to={`/`}>
            <FaTwitter />
          </Link>
          <Link to={`/`}>
            <FaFacebook />
          </Link>
          <Link to={`/`}>
            <FaInstagram />
          </Link>
        </div>

        <div>
          <Sheet>
            <SheetTrigger>
              <AiOutlineMenu size={25} />
            </SheetTrigger>
            <SheetContent>
             <section className="h-full flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-5">
                <Link to={`/createblog`}>
                <h3 className="text-sm font-bold">CREATE A BLOG</h3>
                </Link>
                <Link to={`/myblogs`}>
                <h3 className="text-sm font-bold">MY BLOGS</h3>
                </Link>
              </div>
              <div className="mt-10">
                <Link to={`/sign-in`}>
                {!userId ? <Button variant='default'>
                  Login
                </Button> : <Button variant='destructive' onClick={handleLogout}>
                  Logout
                </Button>}
                </Link>


              </div>
             </section>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
