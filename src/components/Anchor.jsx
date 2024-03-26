import React from 'react'
import { NavLink } from 'react-router-dom'


function Anchor({href, title}) {
    return (
            <NavLink to={href} className={({ isActive }) =>
            isActive 
            ? "bg-white rounded-md py-2 px-1 hover:bg-blue-700 hover:text-white w-36 text-center font-bold text-red-600" 
            : "bg-blue-600 rounded-md py-2 px-1 hover:bg-blue-700 w-36 text-center font-bold text-white"}
            >{title}</NavLink>
    )
}

export default Anchor