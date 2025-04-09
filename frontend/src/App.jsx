import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Test from './components/Test'
import Signup from './components/Signup'
import Login from './components/Login'
import UploadBlog from './components/UploadBlog'
import BlogList from './components/BlogList'
import RealHome from './components/RealHome'
import Profile from './components/Profile'

const App = () => {
  return (
    <Routes>
      <Route path='/:username' element={<Home />} />
      <Route path='/' element={<Home />} />
      <Route path='/test' element={<Test />} />
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/uploadblog/:username' element={<UploadBlog/>}/>
      <Route path='/bloglist' element={<BlogList/>}/>
      <Route path='/myprofile' element={<RealHome/>}/>
      <Route path='/profiles/:username' element={<Profile/>}/>
    </Routes>
  )
}

export default App