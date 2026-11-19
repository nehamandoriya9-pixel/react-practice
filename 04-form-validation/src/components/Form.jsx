import  {useState} from 'react'
import {Routes, Route} from 'react-router-dom'

export default function Form() {
     const [data, setData] = useState({
    userName: "",
    email: "",
    password: ""
  })
  const [toggle, setToggle] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setToggle(true)
  }
  return (
   <div className="min-h-screen flex justify-center items-center bg-gray-200">
    <div className="bg-gray-300 p-2 font-bold rounded-md shadow-md">
    <h2 className="text-center">Form</h2> <br />
    <form action="" className="space-x-2">
      <label htmlFor="">Enter your Name: </label>
      <input type="text"
      value={data.userName}
      onChange={(e) => setData({...data, userName: e.target.value})} 
      placeholder="Enter your name..." 
      className="bg-gray-100 outline-none font-light text-sm p-1 rounded-md shadow-md"/> <br /> <br />
      <label htmlFor="">Enter your Email: </label>
      <input 
      type="email"
      value={data.email}
      onChange={(e) => setData({...data, email: e.target.value})}
      placeholder="Enter your email..." 
       className="bg-gray-100 outline-none font-light text-sm p-1 rounded-md shadow-md"/> <br /> <br />
      <label htmlFor="">Enter your Password</label>
      <input 
      type="password"
      value={data.password}
      onChange={(e) => setData({...data, password: e.target.value})}
      placeholder="Enter your password..." 
       className="bg-gray-100 outline-none font-light text-sm p-1 rounded-md shadow-md"/> <br /> <br />

       <button 
       className="bg-gray-100 p-1 rounded-md shadow-md focus:bg-gray-400"
       onClick={(e) => handleClick(e)}
       >Submit</button>
    </form>
    {toggle && (
      <div>
        <h2>User Name is : {data.userName}</h2>
        <h2>User email is : {data.email}</h2>
        <h2>User password is : {data.password}</h2>
      </div>
    )}
  </div>
  </div>
  )
}
