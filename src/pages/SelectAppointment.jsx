import React, { useEffect, useState, useRef } from 'react'
import { SPECIALITIES } from '../utils/linksSpecialities'
import axios from 'axios'
import { useSelector } from 'react-redux'
import CalendarAppointments from '../components/CalendarAppointments'

function SelectAppointment() {

    const [doctors, setDoctors] = useState([])
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [selectedSpecialityAndDoctor, setSelectedSpecialityAndDoctor] = useState({
        speciality: '',
        doctor: ''
    })

    const [doctorConfirmed, setDoctorConfirmed] = useState({})

    const [specialitySelected, setSpecialitySelected] = useState(false)
    const [doctorSelected, setDoctorSelected] = useState(false)

    const [showAppointment, setShowAppointment] = useState(false);

    const specialityRef = useRef(null)
    const doctorRef = useRef(null)

    const user = useSelector(store => store.authReducer.user)


    useEffect(() => {
        axios.get('/api/doctor/all')
            .then(response => {
                setDoctors(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    // console.log(doctors);

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

    console.log(selectedSpecialityAndDoctor);


    // console.log(selectedSpeciality)
    // console.log(filteredDoctors)

    return (
    <div>
        <h1 className='text-center font-bold mt-10 text-2xl'>Welcome {user.firstName + " " + user.lastName}!</h1>
        <h3 className='text-center text-[#06A9B2] font-bold mt-6'>Get your medical appointment with just one click</h3>
        <div className='flex flex-col justify-center items-center mt-6 gap-6'>
            <fieldset className='flex justify-center items-center gap-3 relative'>
                <img src="/Speciality.png" alt="Image hands and health" className='w-10'/>
                <select ref={specialityRef} name="speciality" onChange={handleSpecialitySelect} onClick={handleInput} onFocus={handleSelectChange} className='font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4 relative'>
                    <option value="" >Please select a speciality...</option>
                    {SPECIALITIES.map((speciality, index) => (
                        <option key={index} value={speciality}>{speciality}</option>
                    ))}
                </select>
                {specialitySelected && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-17px] left-16'>Please select a speciality</p>}
            </fieldset>
            
            <fieldset className='flex justify-center items-center gap-3 relative'>
                <img src="/Doctor.png" alt="Image doctor icon" className='w-10' />
                <select ref={doctorRef} name="doctor" className='font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4' onClick={handleInput} onFocus={handleSelectChange}>
                    <option value=""  >Please select a doctor...</option>
                    {filteredDoctors.map((doctor, index) => (
                        <option key={index} value={doctor.firstName + " " + doctor.lastName}>{doctor.firstName + " " + doctor.lastName}</option>
                    ))}
                </select>
                {doctorSelected && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-17px] left-16'>Please select a doctor</p>}
            </fieldset>
            
            <button className='bg-[#F19E22] font-bold text-white w-40 h-14 rounded-lg mt-6 hover:bg-[#dc901e]' onClick={handleShowAppointment}>Show Available Appointments</button>
            
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