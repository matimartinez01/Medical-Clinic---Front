import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authActions from '../redux/actions/auth.actions.js'
import { useNavigate } from 'react-router-dom'
import GeneralFooter from '../components/GeneralFooter.jsx'
import TermsAndConditions from '../components/TermsAndConditions.jsx'
import axios from 'axios'
import GeneralHeader from '../components/GeneralHeader.jsx'

function SingIn() {

    const [userData, setUserData] = useState({email: "", password: ""})
    const [invalidEntrance, setinvalidEntrance] = useState("")

    const [showPassword, setShowPassword] = useState(false)

    const {login, current} = authActions

    const dispatch = useDispatch()

    const navigate = useNavigate()



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
                        navigate("/appointment")
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

    function handleShowPassword() {
        setShowPassword(!showPassword)
    }



    return (
    <>
        <GeneralHeader />

        <main className='w-full flex flex-col flex-1'>
            <div className='flex flex-wrap justify-center items-center'>
                <img className='md:w-1/2' src="/Login.jpg" alt="Image a doctor" />
                <form className='flex flex-col justify-center items-center gap-5 p-8 md:w-1/2' onSubmit={handleSingIn}>
                        <fieldset className='flex justify-center items-center gap-3'>
                            <img className='w-8' src="/User.png" alt="" />
                            <div className='relative flex'>
                                <input type="email" name="email" className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" placeholder='Email' autoComplete='username' onInput={handleInput}/>

                            </div>
                        </fieldset>

                        <fieldset className='flex justify-center items-center gap-3'>
                            <img className='w-8' src="/Padlock.png" alt="Icon password" />
                            <div className='relative flex'>
                                <input type={showPassword ? "text" : "password"} name="password" className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" placeholder='Password' autoComplete="current-password" onInput={handleInput}/>
                                <img className="w-4 cursor-pointer absolute left-[275px] top-[15px]" src={showPassword ? "/EyeOpen.png" : "/EyeClosed.png"} alt="Toggle password visibility" onClick={handleShowPassword}/>
                            </div>
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