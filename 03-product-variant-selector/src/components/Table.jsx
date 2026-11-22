import React from 'react'

export default function Table() {
    const skills = [
        {
            id: 1,
            name:"neha",
            skill: "React.js"
        },
        {
            id:2,
            name: "saloni",
            skill: "Javascript"
        },
        {
            id: 3, 
            name: "khushi",
            skill: "Python"
        }
    ]
  return (
    <div className=''>
        <h2 className='font-bold text-2xl'>Table</h2>
        <table>
            
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Skills</th>
            </tr>
            {skills.map((item) => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.skill}</td>
                </tr>
            ))
            }
        </table>
    </div>
  )
}
