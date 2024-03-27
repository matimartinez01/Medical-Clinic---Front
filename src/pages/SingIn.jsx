import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authActions from '../redux/actions/auth.actions.js'
import { useNavigate } from 'react-router-dom'
import GeneralFooter from '../components/GeneralFooter.jsx'
import TermsAndConditions from '../components/TermsAndConditions.jsx'
import axios from 'axios'

function SingIn() {

    const [userData, setUserData] = useState({email: "", password: ""})
    const [invalidEntrance, setinvalidEntrance] = useState("")

    const [isOpen, setIsOpen] = useState(false)

    const {login, current} = authActions

    const dispatch = useDispatch()

    const navigate = useNavigate()

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


    function handleSingIn(e) {
        e.preventDefault()
        axios.post("/api/patient/login", userData)
        .then(response => {
            console.log(response.data)
            let token = response.data
            dispatch(login(response.data))
            if (token) {
                axios.get('/api/patient/current', {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                    .then(response => {
                        dispatch(current(response.data))
                        // console.log(response.data);
                        navigate("/specialties")
                        // localStorage.setItem("lastLogin", new Date().toISOString())
                    })
                    .catch(error => console.log(error.response.data))
            }
            
        })
        .catch(error => { console.log(error.response.data)
            setinvalidEntrance(error.response.data)
        })
        
    }

    console.log(userData);



    function handleInput(e){
        
        return setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }



    return (
    <>
    <header className='w-full flex-col flex items-center justify-center'>
            <img className='w-60 pt-4 max-[768px]:hidden' src="/LogoSerenetyH.png" alt="Image logo Serenety Health Center" />
            <div className='bg-blue-800 w-full items-center justify-center gap-4 mt-4 hidden md:flex space-x-4'>
                <NavLink to="/" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Home</NavLink>
                <NavLink to="/" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Medical Specialties</NavLink>
                <NavLink to="/" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">My Appointments</NavLink>
                <NavLink to="/" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Contact</NavLink>
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
                        <NavLink to="/" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Home</NavLink>
                        <NavLink to="/" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Medical Specialties</NavLink>
                        <NavLink to="/" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">My Appointments</NavLink>
                        <NavLink to="/" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Contact</NavLink>
                        <hr className='w-[95%]'/>
                        <NavLink to="/register" className="p-2 text-center font-bold text-[#F19E22] hover:text-white">Sing up</NavLink>
                        <NavLink to="/login" className="p-2 text-center font-bold text-[#F19E22] hover:text-white">Sing in</NavLink>
                    </div>
                )}
        </header>

        <main className='w-full flex flex-col flex-1'>
            <div className='flex flex-wrap justify-center items-center'>
                <img className='md:w-1/2' src="/Login.jpg" alt="Image a doctor" />
                <form className='flex flex-col justify-center items-center gap-5 p-8 md:w-1/2' onSubmit={handleSingIn}>
                        <fieldset className='flex justify-center items-center gap-3'>
                            <img className='w-8' src="/User.png" alt="" />
                            <input type="email" name="email" className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" placeholder='Email' autoComplete='username' onInput={handleInput}/>
                        </fieldset>

                        <fieldset className='flex justify-center items-center gap-3 relative'>
                            <img className='w-8' src="/Padlock.png" alt="" />
                            <input type="password" name="password" className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" placeholder='Password' autoComplete="current-password" onInput={handleInput}/>
                            <p className='text-red-600 font-bold italic text-xs absolute bottom-[-15px]'>{invalidEntrance}</p>
                        </fieldset>

                        <input type="submit" value="Sing in" className='bg-[#F19E22] rounded-xl py-2 px-1 hover:bg-[#dc901e] w-[180px] text-center font-bold text-white cursor-pointer'/>
                        <p className='text-red-600 font-semibold cursor-pointer text-xs underline'>Have you forgotten your password?</p>
                        <NavLink to={"/register"} className='text-red-600 font-semibold cursor-pointer text-xs underline'>Are you not registered yet? SING UP</NavLink>
                </form>
            </div>
            
            <TermsAndConditions/>

            
            
        </main>

        <GeneralFooter/>
    
    
    </>    )
}

export default SingIn