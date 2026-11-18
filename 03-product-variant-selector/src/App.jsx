import { Route, Routes } from "react-router"
import Product from "./components/Product"

function App() {

  return (

   <div>
   <Routes>
    <Route path="/" element={<Product />}/>
   </Routes>
   </div>
  )
}

export default App
