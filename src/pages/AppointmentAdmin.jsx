import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import CalendarAppointmentsAdmin from '../components/CalendarAppointmentsAdmin'
import { NavLink } from 'react-router-dom'


function AppointmentAdmin() {

    const [doctors, setDoctors] = useState([])
    const [filteredDoctors, setFilteredDoctors] = useState([])
    const [patients, setPatients] = useState([])
    const [selectedSpecialityAndDoctor, setSelectedSpecialityAndDoctor] = useState({
        speciality: '',
        doctor: ''
    })

    const [doctorConfirmed, setDoctorConfirmed] = useState({})

    const [specialitySelected, setSpecialitySelected] = useState(false)
    const [doctorSelected, setDoctorSelected] = useState(false)

    const [showAppointment, setShowAppointment] = useState(false)
    const [showDoctors, setShowDoctors] = useState(false)
    const [showPatients, setShowPatients] = useState(false)

    const specialityRef = useRef(null)
    const doctorRef = useRef(null)

    const [email, setEmail] = useState('')
    const [user, setUser] = useState("")
    const [specialities, setSpecialities] = useState([])

    useEffect(() => {
        axios.get('/api/patient/all',
            {headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjp7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifSwic3ViIjoibWF0aUBhZG1pbi5jb20iLCJpYXQiOjE3MTIwMDMyMzEsImV4cCI6MTcxMjAwNjgzMX0.cgyHO0WPfFFCOXVN9GaWm1_tUpmIr9ue_wlwX5DmwKQ"
                }
            })
            .then(response => {
                setPatients(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    console.log(patients)

    useEffect(() => {
        axios.get('/api/doctor/specialities')
            .then(response => {
                setSpecialities(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        axios.get('/api/doctor/all')
            .then(response => {
                setFilteredDoctors(response.data)
            })
            .catch(error => console.log(error))
    }, [])
    
    useEffect(() => {
        axios.get('/api/doctor/all')
            .then(response => {
                setDoctors(response.data)
            })
            .catch(error => console.log(error))
    }, [])


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

    // console.log(doctors)

    const handleSpecialitySelect = (e) => {
        setFilteredDoctors(doctors.filter(doctor => doctor.speciality === e.target.value))
        setSelectedSpecialityAndDoctor({
            ...selectedSpecialityAndDoctor,
            doctor: '',
        })
        }

    function handleInput(e) {
        setDoctorConfirmed(doctors.find(doctor => doctor.firstName + " " + doctor.lastName === e.target.value))
        
        return setSelectedSpecialityAndDoctor({
            ...selectedSpecialityAndDoctor,
            [e.target.name]: e.target.value
        })
    }

    // console.log(doctorConfirmed)

    function handleShowAppointment(e) {
        if (selectedSpecialityAndDoctor.speciality && selectedSpecialityAndDoctor.doctor) {

            setShowAppointment(true)
        } else {
            setShowAppointment(false)
        }

        if(!selectedSpecialityAndDoctor.speciality) {
            setSpecialitySelected(true)
        }
        if(!selectedSpecialityAndDoctor.doctor) {
            setDoctorSelected(true)
        }
    }

    function handleDoctors(e) {
        setUser(patients.find(patient => patient.email == email))
    }



    function patientEmail(e) {
        setEmail(e.target.value)
    }

    function handleSelectChange(e) {
        if (e.target.name === "speciality") {
            setSpecialitySelected(false)
        }
        if(e.target.name === "doctor") {
            setDoctorSelected(false)
        }
        setShowAppointment(false)
    }

    //let appoinmentQuantity = user.appointments?.length
    
    //let appointmentsDays = user.appointments?.map(appointment => appointment.date)

    //let appointmentsPending = appointmentsDays?.filter(appointment => appointment > new Date().toISOString().split('T')[0]).length

    //console.log(appointmentsPending);

    // console.log(selectedSpecialityAndDoctor)
    // console.log(doctors);

    // console.log(user.appointments)
    // console.log(selectedSpeciality)
    // console.log(filteredDoctors)
    // console.log(appoinmentQuantity)

    return (

        <div>

        <header className='w-full flex-col flex items-center justify-center'>
            <img className='w-60 pt-4 max-[768px]:hidden' src="/LogoSerenetyH.png" alt="Image logo Serenety Health Center" />
            <div className='bg-blue-800 w-full items-center justify-center gap-4 mt-4 hidden md:flex space-x-4'>
                <NavLink to="/registerDoctor" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Register Doctor</NavLink>
                <NavLink to="/registerAdmin" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Register Admin</NavLink>
                <NavLink to="/appointmentsAdmin" className="p-2 text-center font-bold text-[#F19E22] hover:text-white">Appointments</NavLink>
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
                        <NavLink to="/registerAdmin" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Register Admin</NavLink>
                        <NavLink to="/appointmentsAdmin" className="p-2 text-center font-bold text-[#F19E22]">Appointments</NavLink>
                        <NavLink to="/patientsAdmin" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Patients</NavLink>
                        <NavLink to="/doctorsAdmin" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Doctors</NavLink>
                        <NavLink to="/adminsAdmin" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Admins</NavLink>
                    </div>
                )}
        </header>

        <main className='w-full min-h-screen'>

        
        <h3 className='text-center text-[#06A9B2] font-bold mt-10 px-2 text-2xl'>Register an appointment</h3>
        <div className='flex flex-col justify-center items-center mt-6'>
            <input type='text' name='patientEmail' onInput={patientEmail} className='font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4 relative' placeholder='Enter patient email'></input>
            {(user == undefined)  &&  <p className='text-red-600 font-bold italic text-xs mt-2'>There isn't any patient with that email</p>}
            <button className='bg-[#F19E22] font-bold text-white w-36 h-10 rounded-lg mt-6 hover:bg-[#dc901e] mb-4' onClick={handleDoctors}>Show doctors</button>
        </div>

        {(user != undefined && user != "") && (
        
        <div className='flex flex-col justify-center items-center mt-6 gap-6'>
            <div className='flex flex-col gap-6 md:flex-row md:gap-20'> 
                <fieldset className='flex justify-center items-center gap-3 relative'>
                    <img src="/Speciality.png" alt="Image hands and health" className='w-8'/>
                    <select ref={specialityRef} name="speciality" onChange={handleSpecialitySelect} onClick={handleInput} onFocus={handleSelectChange} className='font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4 relative'>
                        <option value="" >Select a speciality...</option>
                        {specialities?.map((speciality, index) => (
                            <option key={index} value={speciality}>{speciality}</option>
                        ))}
                    </select>
                    {specialitySelected && <p className='text-red-600 font-bold italic text-xs absolute bottom-[10px] left-16'>Please select a speciality</p>}
                </fieldset>
                
                <fieldset className='flex justify-center items-center gap-3 relative'>
                    <img src="/Doctor.png" alt="Image doctor icon" className='w-8' />
                    <select ref={doctorRef} name="doctor" className='font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4' onClick={handleInput} onFocus={handleSelectChange}>
                        <option value=""  >Select a doctor...</option>
                        {filteredDoctors.map((doctor, index) => (
                            <option key={index} value={doctor.firstName + " " + doctor.lastName}>{doctor.firstName + " " + doctor.lastName}</option>
                        ))}
                    </select>
                    {doctorSelected && <p className='text-red-600 font-bold italic text-xs absolute bottom-[10px] left-16'>Please select a doctor</p>}
                </fieldset>
            </div>
            

            <button className='bg-[#F19E22] font-bold text-white w-40 h-14 rounded-lg mt-6 hover:bg-[#dc901e] mb-14' onClick={handleShowAppointment}>Show Available Appointments</button>
            </div>
            )}

            {showAppointment && (
            <div>
                <CalendarAppointmentsAdmin doctorConfirmed={doctorConfirmed} patientConfirmed={user}/>
            </div>
            )}

        </main>


        <footer className='w-full pt-10 h-[80px] bg-blue-800'>

        </footer>
        
    </div>
    )
}

export default AppointmentAdmin