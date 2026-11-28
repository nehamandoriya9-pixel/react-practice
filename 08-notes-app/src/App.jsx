import React from 'react'
import { Route, Routes } from "react-router"
import Dashboard from './components/Dashboard'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Dashboard />}/>
      </Routes>
    </div>
  )
}
