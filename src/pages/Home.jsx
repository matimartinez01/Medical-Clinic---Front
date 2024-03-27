import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Carrousel from '../components/Carrousel'
import GeneralFooter from '../components/GeneralFooter'


function Home() {

    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isOpen])



    return (
    <>
        <header className='w-full flex-col flex items-center justify-center'>
            <img className='w-60 pt-4 max-[768px]:hidden' src="/LogoSerenetyH.png" alt="Image logo Serenety Health Center" />
            <div className='bg-blue-800 w-full items-center justify-center gap-4 mt-4 hidden md:flex space-x-4'>
                <NavLink to="/home" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Home</NavLink>
                <NavLink to="/home" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Medical Specialties</NavLink>
                <NavLink to="/home" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">My Appointments</NavLink>
                <NavLink to="/home" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Contact</NavLink>
                <NavLink to="/register" className="p-2 text-center font-bold text-[#F19E22] hover:text-white">Sing up</NavLink>
                <NavLink to="/login" className="p-2 text-center font-bold text-[#F19E22] hover:text-white">Sing in</NavLink>
            </div>

            <div className="md:hidden flex justify-between items-center w-full px-10 py-3">
                        <button onClick={toggleMenu} className="text-white focus:outline-none pt-6">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="black">
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                        <img className='w-40 pt-4' src="/LogoSerenetyH.png" alt="Image logo Serenety Health Center" />
            </div>
            {isOpen && (
                    <div className="absolute w-full bg-blue-600 md:hidden z-50 flex flex-col items-start justify-start gap-4 top-[85px] pl-8 h-full">
                        <NavLink to="/home" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Home</NavLink>
                        <NavLink to="/home" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Medical Specialties</NavLink>
                        <NavLink to="/home" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">My Appointments</NavLink>
                        <NavLink to="/home" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Contact</NavLink>
                        <hr className='w-[95%]' />
                        <NavLink to="/register" className="p-2 text-center font-bold text-[#F19E22] hover:text-white">Sing up</NavLink>
                        <NavLink to="/login" className="p-2 text-center font-bold text-[#F19E22] hover:text-white">Sing in</NavLink>
                    </div>
                )}
        </header>
        
        <main classneme="w-full flex flex-col flex-1">
            <Carrousel/>
            
            <h1 className='text-center font-bold text-3xl mt-10 text-[#F19E22]'>Serenety</h1>
            <h1 className='text-center font-bold text-5xl mb-10 text-[#06A9B2] '>Health Center</h1>
            <h3 className='text-center w-3/4 md:w-2/3 mx-auto text-lg italic font-semibold'>Our main objective is to satisfy the needs of our patients and their families, providing personalized care through professionals with extensive experience, 
            recognition and ethical commitment. Human resources, together with state-of-the-art technology, allow us to offer our patients the best of our Institution 
            for the provision of health care services, where quality and warmth are the basis of our daily work.</h3>
            
            <div className='flex flex-wrap gap-10 justify-center my-10'>
                <div className='flex flex-col justify-center items-center bg-blue-800 rounded-lg w-[350px] py-4 gap-4'>
                    <div className='flex justify-center items-center gap-4'>
                        <img className='w-10' src="/Watch.png" alt="Image watch" />.
                        <p className='text-white font-semibold text-2xl'>Our Schedules</p>
                    </div>
                    
                    <hr className='w-3/4'/>
                    <div className='flex flex-col justify-center items-center'>
                        <p className='text-white font-semibold'>Monday to Friday</p>
                        <p className='text-white font-semibold'>from 8:00 a.m. to 9:00 p.m.</p>
                    </div>
                    <hr className='w-3/4'/>
                    <div className='flex flex-col justify-center items-center'>
                        <p className='text-white font-semibold'>Saturday</p>
                        <p className='text-white font-semibold'>from 8:00 a.m. to 13:00 p.m.</p>
                    </div>
                    <hr className='w-3/4'/>
                    <button className='bg-white font-bold w-32 h-10 rounded-lg text-xl hover:bg-green-600 hover:text-white'>Call</button>
                </div>
                
                <div className='border-2 border-blue-400 rounded-lg w-[350px] flex flex-col justify-center items-center py-6 gap-6'>
                    <div>
                        <h4 className='font-bold text-2xl text-[#06A9B2]'>Our Service Centers</h4>
                        <hr className='w-full border-[#06A9B2] border-[1px]'/>
                    </div>
                    <div className='flex items-center justify-center gap-3'>
                        <img className='w-10 h-10' src="/Location.png" alt="Image location" />
                        <div className='flex flex-wrap'>
                            <p className='font-semibold text-lg'>Family Medical Group Miami</p>
                            <p className='text-sm'>736 NW 22nd Ave, Miami, FL 33125, Estados Unidos</p>
                        </div>
                    </div>
                    
                    <div className='flex items-center justify-center gap-3'>
                        <img className='w-10 h-10' src="/Location.png" alt="Image location" />
                        <div className='flex flex-wrap'>
                            <p className='font-semibold text-lg'>Hispanic Health Care Center</p>
                            <p className='text-sm'>1070 SW 1st St, Miami, FL 33130, Estados Unidos</p>
                        </div>
                    </div>
                    
                    <div className='flex items-center justify-center gap-3'>
                        <img className='w-10 h-10' src="/Location.png" alt="Image location" />
                        <div className='flex flex-wrap'>
                            <p className='font-semibold text-lg'>Miami Urgent Care</p>
                            <p className='text-sm'>2645 SW 37th Ave #502, Miami, FL 33133, Estados Unidos</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h3 className='text-center w-3/4 md:w-2/3 mx-auto text-lg italic font-semibold'>We constantly strive to provide a high-level healthcare service. We have advanced technology, on par with the best centers nationwide, in an environment differentiated by comfort, where the patient's recovery and well-being is under the care of excellent health professionals. To ensure these standards we have biosafety, infectious disease, teaching and research, and ethics and discipline committees.</h3>
            </div>

            <h3 className='text-center font-bold text-3xl mt-40'>You have someone</h3>
            <h3 className='text-center font-bold text-5xl mb-10 text-[#06A9B2]'>Urgency?</h3>
            <div className='flex flex-wrap bg-green-500 w-2/3 mx-auto p-4 gap-10 justify-evenly rounded-xl items-center mb-20'>
                <div>
                    <p className='text-justify text-white font-bold md:w-[250px] text-xl'>In an emergency, go to the guard.</p>
                    <p className='text-justify text-white font-bold md:w-[250px] text-xl'>Attention 24 hours a day, every day.</p>
                </div>
                <div className='bg-white w-[250px] p-3 rounded-lg'>
                    <p className='text-green-400 font-bold text-center text-2xl'>Active Guard</p>
                    <ul className='text-center italic'>
                        <li>Clinic</li>
                        <li>Gynecology</li>
                        <li>Obstetrics</li>
                    </ul>
                </div>
                <div className='bg-white w-[250px] p-3 rounded-lg'>
                    <p className='text-blue-400 font-bold text-center text-2xl'>Passive Guard</p>
                    <ul className='text-center italic'>
                        <li>Cardiology</li>
                        <li>Neurology</li>
                        <li>Traumatology</li>
                    </ul>
                </div>
            </div>
            
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.4669681028386!2d-80.36536052403078!3d25.589394815702452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9c51b39a08a0d%3A0x8692fd5f1de210c4!2sMiami%20Health%20Center!5e0!3m2!1ses!2sar!4v1711493518778!5m2!1ses!2sar" className='w-full h-[400px] mt-10'  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </main>
        
        <GeneralFooter/>
    </>
    )
}

export default Home