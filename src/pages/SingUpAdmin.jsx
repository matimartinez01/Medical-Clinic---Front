import React, { useRef, useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import GeneralFooter from '../components/GeneralFooter'
import axios from 'axios'

const RegisterAdmin = () => {

    const firstNameRef = useRef(null)
    const lastNameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)


    const formRef = useRef(null)


    const [register, setRegister] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })


    const [firstNameEntered, setFirstNameEntered] = useState(false)
    const [lastNameEntered, setLastNameEntered] = useState(false)
    const [emailEntered, setEmailEntered] = useState(false)
    const [emailCharacters, setEmailCharacters] = useState(false)
    const [emailExist, setEmailExist] = useState(false)
    const [passwordEntered, setPasswordEntered] = useState(false)
    const [passwordLength, setPasswordLength] = useState(false)
    const [registerSuccess, setRegisterSuccess] = useState(false)


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

    function handleInput(e) {
        const value = e.target.name === 'genre' ? e.target.value.toUpperCase()  : e.target.value
        return setRegister({
            ...register,
            [e.target.name]: value,
            
        })
    }


    
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        let firstNameValid = true
        let lastNameValid = true
        let emailValid = true
        let passwordValid = true


        if (firstNameRef.current.value == "") {
            setFirstNameEntered(true)
            firstNameValid = false
        }

        if (lastNameRef.current.value == "") {
            setLastNameEntered(true)
            lastNameValid = false
        }

        if (emailRef.current.value == "") {
            setEmailEntered(true)
            emailValid = false
        }

        if (!emailRef.current.value.includes("@admin") && emailRef.current.value != "") {
            setEmailCharacters(true)
            emailValid = false
        }

        if (passwordRef.current.value == "") {
            setPasswordEntered(true)
            passwordValid = false
        }

        if (passwordRef.current.value.length < 6 && passwordRef.current.value != "") {
            setPasswordLength(true)
            passwordValid = false
        }

        

        

        if (firstNameValid && lastNameValid && emailValid && passwordValid) {
            const register = {
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            }
           axios.post("/api/admin/register", register,
           {headers: {Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjp7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifSwic3ViIjoibWF0aUBhZG1pbi5jb20iLCJpYXQiOjE3MTIwMDMyMzEsImV4cCI6MTcxMjAwNjgzMX0.cgyHO0WPfFFCOXVN9GaWm1_tUpmIr9ue_wlwX5DmwKQ"}})         
                .then(response => {
                    console.log(register)
                    console.log(response.data)
                    if (response.status === 200) {
                        setRegister({
                            firstName: "",
                            lastName: "",
                            email: "",
                            password: "",
                        })
                        formRef.current.reset()
                    }
                })
                .catch(error => {
                    if(error.response.data == "The email is already registered"){
                        setEmailExist(true)
                    }
                    console.log(error.response.data)
                })
        }
    }


    function handleSelectChange(e) {

        if (e.target.name === "firstName") {
            setFirstNameEntered(false)
            setRegisterSuccess(false)
        }

        if(e.target.name === "lastName") {
            setLastNameEntered(false)
            setRegisterSuccess(false)
        }

        if(e.target.name === "email") {
            setEmailEntered(false)
            setEmailCharacters(false)
            setEmailExist(false)
            setRegisterSuccess(false)
        }

        if(e.target.name === "password") {
            setPasswordEntered(false)
            setPasswordLength(false)
            setRegisterSuccess(false)
        }

        if(e.target.name === "genre") {
            setGenreEntered(false)
            setRegisterSuccess(false)
        }

        if(e.target.name === "birthDate") {
            setBirthDateEntered(false)
            setRegisterSuccess(false)
        }
    }

    function handleSuccess() {
        navigate("/login")
    }

    function handleCheckboxChange(e) {
        setIsChecked(!isChecked)
        setisNotChecked(false)
    }

    let workDaysTest = []

    function checkboxWorkDays(e){
        if(e.target.checked == true) {
            workDaysTest.push(e.target.value)
        }
        else{
            workDaysTest = workDaysTest.filter(element => element !== e.target.value)
        }
        console.log(workDaysTest)   
    }

    let hoursTest = []

    function checkboxHour(e){
        if(e.target.checked == true) {
            hoursTest.push(e.target.value)
        }
        else{
            hoursTest = hoursTest.filter(element => element !== e.target.value)
        }
        console.log(hoursTest)   
    }



   
   



    console.log(register)
    // console.log(emailExist)





    return (
    <div className='flex flex-col w-full min-h-dvh'>
        <header className='w-full flex-col flex items-center justify-center'>
            <img className='w-60 pt-4 max-[768px]:hidden' src="/LogoSerenetyH.png" alt="Image logo Serenety Health Center" />
            <div className='bg-blue-800 w-full items-center justify-center gap-4 mt-4 hidden md:flex space-x-4'>
                <NavLink to="/registerDoctor" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Register Doctor</NavLink>
                <NavLink to="/registerAdmin" className="p-2 text-center font-bold text-[#F19E22] hover:text-white">Register Admin</NavLink>
                <NavLink to="/appointmentsAdmin" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Appointments</NavLink>
                <NavLink to="/patientsAdmin" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Patients</NavLink>
                <NavLink to="/doctorsAdmin" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Doctors</NavLink>
                <NavLink to="/adminsAdmin" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Admins</NavLink>
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
                        <NavLink to="/registerDoctor" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Register Doctor</NavLink>
                        <NavLink to="/registerAdmin" className="p-2 text-center font-bold text-[#F19E22]">Register Admin</NavLink>
                        <NavLink to="/appointmentsAdmin" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Appointments</NavLink>
                        <NavLink to="/patientsAdmin" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Patients</NavLink>
                        <NavLink to="/doctorsAdmin" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Doctors</NavLink>
                        <NavLink to="/adminsAdmin" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Admins</NavLink>
                    </div>
                )}
        </header>

        <main className='w-full flex flex-col flex-1'>
            <div className='flex flex-wrap justify-center items-center'>
                <img className='md:w-1/2' src="/Register.jpg" alt="Image a doctor" />

                <form ref={formRef} className='flex flex-col justify-center items-center gap-4 lg:gap-6 p-8 md:w-1/2' onSubmit={handleSubmit}>
                        <fieldset className='flex justify-center items-center gap-3 relative'>
                            <img className='w-8' src="/FirstName.png" alt="" />
                            <input type="text" name="firstName" ref={firstNameRef} className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" placeholder='First Name' autoComplete='username' onFocus={handleSelectChange} onInput={handleInput}/>
                            {firstNameEntered && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Please enter your first name</p>}
                        </fieldset>
                        
                        <fieldset className='flex justify-center items-center gap-3 relative'>
                            <img className='w-8' src="/LastName.png" alt="" />
                            <input type="text" name="lastName" ref={lastNameRef} className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" placeholder='Last Name' autoComplete='username' onFocus={handleSelectChange} onInput={handleInput}/>
                            {lastNameEntered && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Please enter your last name</p>}
                        </fieldset>

                        <fieldset className='flex justify-center items-center gap-3 relative'>
                            <img className='w-8' src="/UserMail.png" alt="" />
                            <input type="mail" name="email" ref={emailRef} className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" placeholder='Email' autoComplete='username' onFocus={handleSelectChange} onInput={handleInput}/>
                            {emailEntered && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Please enter the email</p>}
                            {emailCharacters && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>The email has to contain @admin</p>}
                            {emailExist && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>The email is already registered</p>}
                        </fieldset>
                        
                        <fieldset className='flex justify-center items-center gap-3 relative'>
                            <img className='w-8' src="/Padlock.png" alt="" />
                            <input type="password" name="password" ref={passwordRef} className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" placeholder='Password' autoComplete="current-password" onFocus={handleSelectChange} onInput={handleInput}/>
                            {passwordEntered && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Please enter your password</p>}
                            {passwordLength && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Password must be at least 8 characters</p>}
                        </fieldset>

                
                        <div className='relative'>
                            <input type="submit" value="Register Admin" className='bg-[#F19E22] rounded-xl py-2 px-1 hover:bg-[#dc901e] w-[180px] text-center font-bold text-white cursor-pointer'/>
                            {/* {registerSuccess && <p className='text-green-600 font-bold italic text-xs absolute left-6'>Registered successfully</p>} */}
                            {registerSuccess && (
                            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                    <p className='text-green-600 font-bold text-lg'>Registered successfully!</p>
                                    <p className="pt-4">Thank you for trusting Serenety Health Center.</p>
                                    <div className="flex justify-center gap-4 mt-6">
                                        <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-md w-[120px]" onClick={handleSuccess}>Continue</button>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>

                       
                </form>
            </div>

            {/* Alerta exitosa */}
            
        </main>


        <footer className='w-full pt-10 h-[80px] bg-blue-800'>

        </footer>

    </div>
    )
    
}



export default RegisterAdmin