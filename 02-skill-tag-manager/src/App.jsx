import { useState } from 'react'

function App() {
  const [tag, setTag] = useState([]);
  const [tagName, setTagName] = useState("");

  const addTag = () => {
    if (tagName.trim() === "") {
      return;
    }
    const tags = {
      id: Date.now(),
      tagName: tagName,
    }
    const existingTag = tag.find((item) => item.tagName.toLowerCase() === tagName.toLowerCase());

    if (existingTag){
      return;
    } else{
      setTag([...tag, tags])
    }

    setTagName("")
  }

  const deleteTag = (id) => {
    setTag(tag.filter((item) => item.id !== id))
  }
  return (
  <div className='min-h-screen bg-green-50 flex justify-center items-center'>
    <div className='w-lg p-1 rounded-xl shadow-2xl bg-green-100 space-y-4'>
      <h2 className='text-xl text-center font-bold text-green-950'> Skill Tag Manager</h2>
      <div className='space-x-2'>
        <input 
        type="text"
        value={tagName}
        onChange={(e) => setTagName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTag()
          }
        }}
        placeholder='Enter Tag Name...' 
        className='bg-green-200 p-1 ml-2 rounded-md shadow-md outline-none border border-green-50 text-green-800 hover:bg-green-300'/>
        <button className='bg-green-200 p-1 ml-2 rounded-md shadow-md outline-none border border-green-50 font-bold text-green-900 hover:bg-green-300'
        onClick={addTag}>Add Tag</button>
      </div>
      <div className='p-2 grid-cols-3 grid bg-green-200'>
      {tag.map((item) => (
        <div key={item.id} className='p-2 flex gap-2'>
          <h2 className='bg-green-100 p-2 rounded-md shadow-md text-sm font-medium text-green-800'
          >{item.tagName}</h2>
          <button 
          className='bg-green-100 p-2 rounded-md shadow-md text-sm font-medium text-green-800'
          onClick={() => deleteTag(item.id)}>Remove</button>
        </div>
      ))}
      </div>
    </div>
  </div>
  )
}

export default App
