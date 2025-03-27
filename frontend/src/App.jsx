import React from 'react'
import { Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Test from './components/Test'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/test' element={<Test />} />
    </Routes>
  )
}

export default App