import { Route, Routes } from "react-router"
import Product from "./components/Product"
import Table from "./components/Table"

function App() {

  return (

   <div>
   <Routes>
    <Route path="/" element={<Product />}/>
    <Route path="/table" element={<Table />} />
   </Routes>
   </div>
  )
}

export default App
