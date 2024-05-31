import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Blog from '../pages/Blog'
import CreateBlog from '../pages/CreateBlog'
import MyBlogs from '../pages/MyBlogs'
import UpdateBlog from '@/pages/UpdateBlog'

const Routers = ({ user, setUser, userId, setUserId }) => {
  return (
    <Routes>
        <Route path='/'  element={<Home user={user} setUser={setUser} setUserData={setUserId} userData={userId} />} />
        <Route path='/sign-in' element={<Login user={user} setUser={setUser} userData={userId} setUserData={setUserId} />} />
        <Route path='/sign-up' element={<Register user={user} setUser={setUser} userData={userId} setUserData={setUserId} />} />
        <Route path='/blogs/:id' element={<Blog />} />
        <Route path='/createblog' element={<CreateBlog userId={userId} setUserId={setUserId} />} />
        <Route path='/myblogs' element={<MyBlogs userId={userId} setUserId={setUserId} />} />
        <Route path='/updateblog/:id' element={<UpdateBlog userId={userId} setUserId={setUserId} />} />
    </Routes>
  )
}

export default Routers