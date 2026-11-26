import React, { useContext, useState } from 'react'
import { CountContext } from '../context/CounterContext'

export default function Context1() {
  const {count, setCount} = useContext(CountContext)
  const [step, setStep] = useState(0)

  const Increament = () => {
    setCount(prev => prev + Number(step))
  }

 const Decrement = () => {
  setCount(prev => {
    if (prev > 0 && prev >= step) {
      return prev - Number(step)
    } else {
      return prev
    }
  })
}
  return (
     <div className="min-h-screen flex justify-center bg-gray-300 items-center">
    <div className="w-xl bg-gray-400 relative rounded-xl shadow-md p-2 space-y-4">
      <h1 className="text-lg font-bold text-gray-950 text-center">Counter App</h1>
      <div className="flex gap-10">
        <input 
      type="number" 
      value={step}
      onChange={(e) => {
        if (Number(e.target.value) >= 0){
          setStep(e.target.value)
        }
        }}
      className="bg-gray-100 rounded-md shadow-md p-1 ml-6 mb-4 "/>
      <h2 className="font-bold text-sm">Count: {count}</h2>
      </div>
      <div className="p-2 space-x-10">
        <button className="bg-gray-500 p-2 rounded-md shadow-md font-bold text-gray-950 hover:bg-gray-600"
        onClick={Increament}>Increment</button>
        <button className="bg-gray-500 p-2 rounded-md shadow-md font-bold text-gray-950"
        onClick={Decrement}>Decrement</button>
        <button
        className="bg-gray-500 p-2 rounded-md shadow-md font-bold text-gray-950"
        onClick={() => {
          setCount(0)
          setStep(0)}}>Reset</button>
      </div>
    </div>
   </div>
  )
}
