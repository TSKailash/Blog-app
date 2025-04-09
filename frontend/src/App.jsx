import React from 'react'
import { Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Test from './components/Test'
import Signup from './components/Signup'
import Login from './components/Login'
import RealHome from './components/RealHome'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/test' element={<Test />} />
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<RealHome/>}/>
    </Routes>
  )
}

export default App