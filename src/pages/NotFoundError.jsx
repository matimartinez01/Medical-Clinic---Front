import React from 'react'
import { NavLink } from 'react-router-dom'

const NotFoundError = () => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className='flex flex-col items-center justify-center'>
                    <img src="/LogoSerenetyH.png" alt="Image logo Serenety Health Center" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">404 - Page Not Found</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        The page you're looking for could not be found.
                    </p>
                </div>
                <div className='flex justify-center'>
                    <NavLink to="/" className="w-[200px] h-[50px] flex justify-center items-center py-2 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-[#06A9B2] hover:bg-[#47a3a8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#06A9B2]">
                    Return to Home 
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default NotFoundError