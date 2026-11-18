import React, { useState } from "react";
import tshirt from "../assets/tshirt.png";

export default function Product() {
  const [selectSize, setSelectSize] = useState("XXS");
  const [selectColor, setSelectColor] = useState("black");
  // const [count, setCount] = useState(0);
  const [price, setPrice] = useState("199.99")
  const [quantity, setQuantity] = useState(1)
  const [addToCart, setAddToCart] = useState([])

  const Increase = () => {
   setQuantity(quantity+1)
  }

  const Decrease = () => {
    if (quantity > 1) {
     setQuantity(quantity-1)
    }
  }

  const AddToCart = () => {
   const product = {
    id: Date.now(),
    name: "Minimal T-shirt",
    img: tshirt,
    price: price,
    quantity: quantity,
    size: selectSize,
    color: selectColor
   }

   const exitingItem = addToCart.find((item) => item.color === selectColor && item.size === selectSize)
   if (exitingItem) {
    const updateItem = addToCart.map((item) => {
      if (item.id === exitingItem.id) {
        return {
          ...item, 
          quantity: item.quantity + quantity
        }
      }
      return item
    }
  );
  setAddToCart(updateItem);
   } else {
    setAddToCart([...addToCart, product])
   }
  }
  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center">
      <div className="w-xl bg-gray-100 rounded-lg shadow-md p-2 space-y-4">
        <h2 className="text-xl font-bold text-center">PRODUCT TAG SKILL</h2>
        <div className="flex items-start gap-8 ">
          <div className="w-1/2">
            <img
              src={tshirt}
              alt="T-shirt"
              className="w-full rounded-xl object-cover"
            />
          </div>
          <div className="w-1/2 space-y-2">
            <h2 className="font-bold text-xl">Minimal T-shirt</h2>
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 text-xl">★</span>
              <span className="text-yellow-400 text-xl">★</span>
              <span className="text-yellow-400 text-xl">★</span>
              <span className="text-yellow-400 text-xl">★</span>
              <span className="text-gray-300 text-xl">★</span>

              <span className="text-sm text-gray-500 ml-2">
                4.0 (120 reviews)
              </span>
            </div>
            <div className="border-b"/>
            <p className="text-lg font-bold p-2">{price * quantity}</p>
            <div>
              <p className="text-sm font-bold p-2">Size</p>
              <div className="grid grid-cols-6 gap-2">
                <button className={`bg-gray-200 rounded-md shadow-md p-2 text-sm font-bold hover:bg-black hover:text-white ${
                  selectSize === "XXS" ? "bg-black text-white"
      : "bg-gray-200"
                }`}
                value={selectSize} 
                onClick={(e) => setSelectSize(e.target.value)}>XXS</button>
                 <button className={`bg-gray-200 rounded-md shadow-md p-2 text-sm font-bold hover:bg-black hover:text-white ${
                  selectSize === "XS" ? "bg-black text-white"
      : "bg-gray-200"
                }`}
                value="XS" 
                onClick={(e) => setSelectSize(e.target.value)}>XS</button>
                <button 
                value="S"
                onClick={(e) => setSelectSize(e.target.value)}
                className={`bg-gray-200 rounded-md shadow-md p-2 text-sm font-bold hover:bg-black hover:text-white ${
                  selectSize === "S" ? "bg-black text-white"
      : "bg-gray-200"
                }`}>S</button>
                <button 
                value="M"
                onClick={(e) => setSelectSize(e.target.value)}
                className={`bg-gray-200 rounded-md shadow-md p-2 text-sm font-bold hover:bg-black hover:text-white ${
                  selectSize === "M" ? "bg-black text-white"
      : "bg-gray-200"
                }`}>M</button>
                <button 
                value="L"
                onClick={(e) => setSelectSize(e.target.value)}
                className={`bg-gray-200 rounded-md shadow-md p-2 text-sm font-bold hover:bg-black hover:text-white ${
                  selectSize === "L" ? "bg-black text-white"
      : "bg-gray-200"
                }`}>L</button>
                <button
                value="XL" 
                onClick={(e) => setSelectSize(e.target.value)}
                className={`bg-gray-200 rounded-md shadow-md p-2 text-sm font-bold hover:bg-black hover:text-white ${
                  selectSize === "XL" ? "bg-black text-white"
      : "bg-gray-200"
                }`}>XL</button>
              </div>
            </div>
            <div>
             <p className="text-sm font-bold p-2">Color</p>
             <div className="flex gap-3 p-2">
             <button 
             value="white"
             onClick={(e) => setSelectColor(e.target.value)}
             className={`rounded-full w-6 h-6 ${
              selectColor === "white" ? "bg-white border-4 border-red-700" : "bg-white border-4 border-black" 
             }`}></button>
             <button 
             value="black"
             onClick={(e) => setSelectColor(e.target.value)}
             className={`rounded-full w-6 h-6 ${
              selectColor === "black" ? "bg-black border-4 border-red-700" : "bg-black border-2 border-gray-600" 
             }`}></button>
             <button 
              value="blue"
             onClick={(e) => setSelectColor(e.target.value)}
             className={`rounded-full w-6 h-6 ${
              selectColor === "blue" ? "bg-blue-600 border-4 border-red-700" : "bg-blue-600 border-2 border-gray-600" 
             }`}></button>
             <button
             value="yellow"
             onClick={(e) => setSelectColor(e.target.value)}
             className={`rounded-full w-6 h-6 ${
              selectColor === "yellow" ? "bg-yellow-400 border-4 border-red-700" : "bg-yellow-400 border-2 border-gray-400" 
             }`}></button>
             </div>
             </div>
             <div className="flex gap-3">
             <div className="grid grid-cols-3 w-1/2">
              <button className="bg-gray-300 border border-gray-200 p-1 font-bold"
              onClick={Increase}>
                +
              </button>
              <span className="bg-gray-300 border border-gray-200 p-1 pl-4 font-bold">{quantity}</span>
              <button 
              className="bg-gray-300 border border-gray-200 p-1 font-bold"
              onClick={Decrease}>
                -
              </button>
             </div>  
             <button className="bg-gray-300 p-2 rounded-md shadow-md hover:bg-gray-400 font-bold border border-gray-100"
             onClick={AddToCart}>Add To Cart</button>
             </div>
          </div>
        </div>
        <div className="grid grid-cols-4">
        {addToCart.map((item) => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <img
  src={item.img}
  alt={item.name}
  className="w-20 h-20 object-cover rounded-md"
/>
            <p>{item.price * item.quantity}</p>
            <p>{item.size}</p>
            <p>{item.color}</p>
            <p>{item.quantity}</p>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
