import { Image, PencilRuler, Shield } from 'lucide-react'
import React, { useState } from 'react'

function SideNav({selectedindex}) {
    const menulist = [
        {
            id:1,
            name:'Icon',
            icon:PencilRuler
        },
        {
            id:2,
            name:'Background',
            icon:Image
        },
        // {
        //     id:3,
        //     name:'Upgrade',
        //     icon:Shield
        // }
    ]

    const [active, setactive] = useState(0);

  return (
    <div className=' shadow-sm border h-screen'>
        <div>
            {menulist.map((menu, index) => (
                <h2
                onClick={() => {
                    setactive(index);
                    selectedindex(index)
                }}
                className={` hover:bg-primary
                 hover:text-white 
                 cursor-pointer 
                 p-3 text-lg px-7
                  text-gray-500 my-2
                  ${active == index && 'bg-primary text-white'}`}
                key={index}>
                    <menu.icon />
                    {menu.name}
                </h2>
            ))}
        </div>
    </div>
  )
}

export default SideNav