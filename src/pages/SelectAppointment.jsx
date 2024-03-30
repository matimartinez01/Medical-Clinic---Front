import React, { useEffect, useState, useRef } from 'react'
import { SPECIALITIES } from '../utils/linksSpecialities'
import axios from 'axios'
import { useSelector } from 'react-redux'
import CalendarAppointments from '../components/CalendarAppointments'

function SelectAppointment() {

    const [doctors, setDoctors] = useState([])
    const [filteredDoctors, setFilteredDoctors] = useState([])
    const [selectedSpecialityAndDoctor, setSelectedSpecialityAndDoctor] = useState({
        speciality: '',
        doctor: ''
    })

    const [doctorConfirmed, setDoctorConfirmed] = useState({})

    const [specialitySelected, setSpecialitySelected] = useState(false)
    const [doctorSelected, setDoctorSelected] = useState(false)

    const [showAppointment, setShowAppointment] = useState(false)

    const specialityRef = useRef(null)
    const doctorRef = useRef(null)

    const user = useSelector(store => store.authReducer.user)
    console.log(user);


    useEffect(() => {
        axios.get('/api/doctor/all')
            .then(response => {
                setDoctors(response.data)
            })
            .catch(error => console.log(error))
    }, [])

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


    function handleSelectChange(e) {
        if (e.target.name === "speciality") {
            setSpecialitySelected(false)
        }
        if(e.target.name === "doctor") {
            setDoctorSelected(false)
        }
        setShowAppointment(false)
    }

    let appoinmentQuantity = user.appointments?.length
    
    let appointmentsDays = user.appointments?.map(appointment => appointment.date)

    let appointmentsPending = appointmentsDays?.filter(appointment => appointment > new Date().toISOString().split('T')[0]).length

    console.log(appointmentsPending);

    // console.log(selectedSpecialityAndDoctor)
    // console.log(doctors);

    // console.log(user.appointments)
    // console.log(selectedSpeciality)
    // console.log(filteredDoctors)
    // console.log(appoinmentQuantity)

    return (
    <div className='flex flex-1 flex-col justify-center items-center'>
        <h1 className='text-center font-bold mt-10 text-2xl'>Welcome {user.firstName + " " + user.lastName}!</h1>
        {appoinmentQuantity > 0 ?( 
        <>
            <h3 className='text-center text-[#06A9B2] font-bold mt-6 text-lg mb-6'>You have {appointmentsPending} medical appointments.</h3>
            <table className='w-[361.75px] min-[600px]:w-[498.5px]'>
                    <thead>
                        <tr>
                            <th className='min-w-[60px] pb-2 text-center pl-9'><img className='w-10' src="/CalendarAppointment.png" alt="Icon Calendar" /></th>
                            <th className='min-w-[60px] pb-2 text-center pl-9 min-[600px]:pl-[37px]'><img className='w-10 mx-auto' src="/WatchBlue.png" alt="Icon Watch" /></th>
                            <th className='min-w-[100px] min-[600px]:min-w-[200px] pb-2 text-center pl-2 min-[600px]:pl-0'><img className='w-10 mx-auto' src="/Speciality.png" alt="Icon Speciality" /></th>
                            <th className='min-w-[100px] pb-2 text-center'><img className='w-10 mx-auto' src="/Doctor.png" alt="Icon Doctor" /></th>
                        </tr>
                    </thead>
            </table>
        </>) 
        
        : (<h1 className='font-bold text-center text-lg mt-6'>You still don't have medical appointments.</h1>)}
        
        
        {user.appointments?.length > 0 ? (
            <>
                <table className='min-w-[360px]'>
                    <thead>
                        <tr className='bg-gray-300 border-b-2 border-black'>
                            <th className='rounded-tl-xl py-1 text-center font-bold text-xs min-w-[110px] min-[600px]:text-base h-10'>Date</th>
                            <th className='rounded-sm py-1 text-center font-bold text-xs min-w-[30px] min-[600px]:text-base h-10'>Hour</th>
                            <th className='rounded-sm py-1 text-center font-bold text-xs min-w-[100px] min-[600px]:text-base h-10 min-[600px]:min-w-[200px]'>Specialty</th>
                            <th className='rounded-tr-xl py-1 text-center font-bold text-xs min-w-[100px] min-[600px]:text-base h-10'>Doctor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.appointments
                        ?.toSorted((a, b) => new Date(a.date) - new Date(b.date))
                        ?.map(appointment => {
                            const currentDate = new Date();
                            const appointmentDate = new Date(appointment.date);
                            const isPastAppointment = appointmentDate < currentDate;
                            const colorClass = isPastAppointment ? 'text-gray-400' : 'text-green-500';

                            return (
                            <tr key={appointment.id} className='border-b-2 border-gray-400'>
                                <td className={`font-semibold text-center text-xs min-[600px]:text-base h-10 px-2 ${colorClass}`}>{appointment.date}</td>
                                <td className={`font-semibold text-center text-xs min-[600px]:text-base h-10 px-3 ${colorClass}`}>{appointment.time}:00</td>
                                <td className={`font-semibold text-center text-[8px] min-[600px]:text-base h-10 ${colorClass}`}>{doctors?.find (doctor => doctor.firstName + " " + doctor.lastName === appointment.doctor)?.speciality}</td>
                                <td className={`font-semibold text-xs min-[600px]:text-base h-10 px-2 ${colorClass}`}>{appointment.doctor}</td>
                            </tr>
                        )})}
                    </tbody>
                </table>
                <div className="flex gap-4 justify-evenly items-center mt-6">
                <div className="flex items-center gap-1">
                    <div className="flex w-5 h-2 rounded-md bg-green-500 "></div>
                    <p className="font-semibold text-sm">Future appointments</p>
                </div>
                <div className="flex items-center gap-1">
                    <div className="flex w-5 h-2 rounded-md bg-gray-400 "></div>
                    <p className="font-semibold text-sm">Past appointments</p>
                </div>
            </div>
            </>
            ) : null}
        
        
        <h3 className='text-center text-[#06A9B2] font-bold mt-10 px-2 text-2xl'>Get your medical appointment with just one click!</h3>
        <div className='flex flex-col justify-center items-center mt-6 gap-6'>
            <div className='flex flex-col gap-6 md:flex-row md:gap-20'> 
                <fieldset className='flex justify-center items-center gap-3 relative'>
                    <img src="/Speciality.png" alt="Image hands and health" className='w-8'/>
                    <select ref={specialityRef} name="speciality" onChange={handleSpecialitySelect} onClick={handleInput} onFocus={handleSelectChange} className='font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4 relative'>
                        <option value="" >Please select a speciality...</option>
                        {SPECIALITIES.map((speciality, index) => (
                            <option key={index} value={speciality}>{speciality}</option>
                        ))}
                    </select>
                    {specialitySelected && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-17px] left-16'>Please select a speciality</p>}
                </fieldset>
                
                <fieldset className='flex justify-center items-center gap-3 relative'>
                    <img src="/Doctor.png" alt="Image doctor icon" className='w-8' />
                    <select ref={doctorRef} name="doctor" className='font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4' onClick={handleInput} onFocus={handleSelectChange}>
                        <option value=""  >Please select a doctor...</option>
                        {filteredDoctors.map((doctor, index) => (
                            <option key={index} value={doctor.firstName + " " + doctor.lastName}>{doctor.firstName + " " + doctor.lastName}</option>
                        ))}
                    </select>
                    {doctorSelected && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-17px] left-16'>Please select a doctor</p>}
                </fieldset>
            </div>
            
            <button className='bg-[#F19E22] font-bold text-white w-40 h-14 rounded-lg mt-6 hover:bg-[#dc901e] mb-14' onClick={handleShowAppointment}>Show Available Appointments</button>
            
            {showAppointment && (
            <div>
                <CalendarAppointments doctorConfirmed={doctorConfirmed}/>
            </div>
        )}

        </div>
        
    </div>
    )
}

export default SelectAppointment