import React, { useState } from 'react'
import Navbar from './Navbar'

const RealHome = () => {

    const [pic , setpic] = useState("")
    const [text,settext] = useState("")

    const handlesubmit = (e)=>{
        e.preventDefault();
        console.log(pic)
    }

  return (
    <div>
      <Navbar/>
      <div>
        <label>Add post </label>
        <form onSubmit={handlesubmit}>
            <label>Add picture :</label>
            <input type="file" name="file" onChange={e=> setpic(e.target.files[0])} />
            <label>Any desc :</label>
            <input type='text'  required onChange={e=> settext(e.target.value)} value={text}></input>
            <button type='form'> submit</button>
        </form>
        
      </div>
    </div>
  )
}

export default RealHome
