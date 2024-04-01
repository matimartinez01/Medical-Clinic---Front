import { NavLink } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import Doctor from "../components/Doctor"

const DoctorAdmin = () => {

    const [doctors, setDoctors] = useState([])
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

    useEffect(() => {
        axios.get("/api/doctor/all")
        .then(res => setDoctors(res.data))
        .catch(err => console.log(err.response.data))
    }, [])

    console.log(doctors)

    return(
        <>
        <div className='flex flex-col w-full min-h-dvh'>
        <header className='w-full flex-col flex items-center justify-center'>
            <img className='w-60 pt-4 max-[768px]:hidden' src="/LogoSerenetyH.png" alt="Image logo Serenety Health Center" />
            <div className='bg-blue-800 w-full items-center justify-center gap-4 mt-4 hidden md:flex space-x-4'>
                <NavLink to="/registerDoctor" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Register Doctor</NavLink>
                <NavLink to="/registerAdmin" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Register Admin</NavLink>
                <NavLink to="/appointmentsAdmin" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Appointments</NavLink>
                <NavLink to="/patientsAdmin" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Patients</NavLink>
                <NavLink to="/doctorsAdmin" className="p-2 text-center font-bold text-[#F19E22] hover:text-white">Doctors</NavLink>
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
                        <NavLink to="/appointmentsAdmin" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Appointments</NavLink>
                        <NavLink to="/patientsAdmin" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Patients</NavLink>
                        <NavLink to="/doctorsAdmin" className="p-2 text-center font-bold text-[#F19E22]">Doctors</NavLink>
                        <NavLink to="/adminsAdmin" className="p-2 text-center font-bold text-white hover:text-[#F19E22]">Admins</NavLink>
                    </div>
                )}
        </header>

        <main className='w-full flex flex-col flex-1 min-h-screen items-center'>
            <div className='flex flex-wrap justify-center items-center w-full'>
                <img className='md:w-full md:h-[500px] object-cover object-center' src="/Register.jpg" alt="Image a doctor" />
            </div>    

            <h1 className="text-center font-bold text-5xl mt-4 text-[#F19E22]">DOCTORS</h1>
            
            <div className="bg-blue-200 w-11/12 min-h-[200px] max-h-[500px] mt-2 flex flex-col gap-y-2 md:w-4/5 text-sm lg:w-1/2 overflow-y-scroll p-1 mb-4 rounded border-2 border-blue-800">
            <div className="w-full bg-blue-800 gap-x-1 text-center items-center md:text-lg font-bold flex">
              <p className="w-1/5 text-white">NAME</p>
              <p className="w-2/4 text-white">EMAIL</p>
              <p className="w-1/5 text-white">SPECIALITY</p>
              <p className="w-1/5"></p>
            </div>

            {doctors?.map(doctor => {
                return <Doctor key={doctor.id} id={doctor.id} name={doctor.firstName + " " + doctor.lastName} email={doctor.email} speciality={doctor.speciality}/>
            })}

            </div>
        </main>

        <footer className='w-full pt-10 h-[80px] bg-blue-800'>
        </footer>

        </div>
        </>
    )
}

export default DoctorAdmin