import React, { useEffect, useState } from 'react'
import { SPECIALITIES } from '../utils/linksSpecialities'
import axios from 'axios'
import { useSelector } from 'react-redux'

function SelectAppointment() {

    const [doctors, setDoctors] = useState([])
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    const user = useSelector(store => store.authReducer.user)


    useEffect(() => {
        axios.get('/api/doctor/all')
            .then(response => {
                setDoctors(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    console.log(doctors);

    const handleSpecialitySelect = (e) => {
        setFilteredDoctors(doctors.filter(doctor => doctor.speciality === e.target.value))
        }

    // console.log(selectedSpeciality)
    // console.log(filteredDoctors)

    return (
    <div>
        <h1 className='text-center font-bold mt-10 text-2xl'>Welcome {user.firstName + " " + user.lastName}!</h1>
        <h3 className='text-center text-[#06A9B2] font-bold mt-6'>Get your medical appointment with just one click</h3>
        <div className='flex flex-col justify-center items-center mt-6 gap-4'>
            <div className='flex gap-3'>
                <img src="/Doctor.png" alt="Image doctor icon" className='w-10'/>
                <select name="specialty" id="" onChange={handleSpecialitySelect} className='font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4'>
                    <option value="">Please select a medical specialty...</option>
                    {SPECIALITIES.map((specialty, index) => (
                        <option key={index} value={specialty}>{specialty}</option>
                    ))}
                </select>
            </div>
            
            
            <select name="doctor" id="" className='font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4'>
                <option value="">Please select a doctor...</option>
                {filteredDoctors.map((doctor, index) => (
                    <option key={index} value={doctor.id}>{doctor.firstName + " " + doctor.lastName}</option>
                ))}
            </select>
        </div>
        
    </div>
    )
}

export default SelectAppointment