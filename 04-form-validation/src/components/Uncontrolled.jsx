import React from 'react'
import { useRef } from 'react'
//uncontrolled Component
export default function Uncontrolled() {
  const inputRef = useRef(null);
  console.log(inputRef)
  
  function handleClick(e) {
    e.preventDefault();
    console.log(inputRef.current.value)
    inputRef.current.style.padding = "20px"
  }
  return (
    <div>
      <form action="">
        <input type="text" 
        placeholder='Enter...'
        className='bg-gray-200 rounded-md p-2'
        ref={inputRef}/>
        <button className='bg-gray-200 rounded-md p-2'
        onClick={(e) => handleClick(e)}>Click ME</button>
      </form>
    </div>
  )
}
