import React from 'react'
import { Outlet } from 'react-router-dom'
import FooterUser from '../components/FooterUser.jsx'
import HeaderUser from '../components/HeaderUser.jsx'





function MainLayout(props) {
    return (
        <div className="flex flex-col w-full min-h-dvh items-center">
            <HeaderUser/>
                {/* {props.children} */}
                <Outlet/>
            <FooterUser/>
        </div>
    )
}

export default MainLayout