import { useState } from "react"
import Uncontrolled from "./components/Uncontrolled"
import {Routes, Route} from 'react-router-dom'
import Form from "./components/Form"
//Controlled Components
function App() {
 
  return (
  <div>
  <Routes>
    <Route path="/" element={<Form />}/>
    {/* <Route path="/form" element={<Uncontrolled />}/> */}
  </Routes>
  </div>
  )
}

export default App
