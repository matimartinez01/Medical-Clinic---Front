import React, { useEffect, useState, useRef, Children } from 'react'
import { SPECIALITIES } from '../utils/linksSpecialities'
import axios from 'axios'
import { useSelector } from 'react-redux'
import CalendarAppointments from '../components/CalendarAppointments'
import { useDispatch } from 'react-redux'
import authActions from '../redux/actions/auth.actions.js'
import { useLocation } from 'react-router-dom'


function Prueba() {

    const user = useSelector(store => store.authReducer.user)

    // console.log(user)

    const location = useLocation()

    let doctorIdParams = location?.state?.doctor
    // let doctorIdParams = location?.state?.doctorId

    const [effectExecuted, setEffectExecuted] = useState(false);

    // console.log(doctorIdParams)

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

    const [confirmDelete, setConfirmDelete] = useState([false, ""])

    const [successDelete, setSuccessDelete] = useState(false)

    const specialityRef = useRef(null)
    const doctorRef = useRef(null)


    const dispatch = useDispatch()
    const { current } = authActions
    

    const [selectedDoctor, setSelectedDoctor] = useState({
        speciality: '',
        doctor: ''
    })


    useEffect(() => {
        if(doctorIdParams != undefined || doctorIdParams != null) {
            setSelectedDoctor({speciality: doctorIdParams.speciality, doctor: doctorIdParams.firstName + " " + doctorIdParams.lastName})
            setDoctorConfirmed(doctorIdParams)
        }
    }, [filteredDoctors, doctorIdParams])

    console.log(selectedDoctor);

    // useEffect(() => {
    //     if(selectedSpecialityAndDoctor.speciality != undefined && selectedSpecialityAndDoctor.speciality != null) {
    //         const doctorsFilteredBySpeciality = doctors.filter(doctor => doctor.speciality === selectedSpecialityAndDoctor.speciality)
    //         setFilteredDoctors(doctorsFilteredBySpeciality)
    //     }
    // }, [selectedSpecialityAndDoctor.speciality, doctors])

    // console.log(filteredDoctors)

    // console.log(selectedDoctor)
    // useEffect(() => {
    //     if (!effectExecuted && (doctorIdParams != undefined || doctorIdParams != null)) {
    //         setSelectedSpecialityAndDoctor({
    //             speciality: doctors?.find(doctor => doctor.id == doctorIdParams)?.speciality,
    //             doctor: doctors?.find(doctor => doctor.id == doctorIdParams)?.firstName + " " + doctors?.find(doctor => doctor.id == doctorIdParams)?.lastName
    //         });
    //         setEffectExecuted(true)
    //     } else if (effectExecuted) {
    //         doctorIdParams = null
    //     }
    // }, [effectExecuted, filteredDoctors, doctors, doctorIdParams]);

    // console.log(location?.state)

    console.log(selectedSpecialityAndDoctor)

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

    console.log(doctorConfirmed)

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


    function handleDelete(e){

        setSuccessDelete(true)

        const appointmentIdToDelete = confirmDelete[1]


        const token = localStorage.getItem("token")

        axios.delete('/api/patient/deleteAppointment',  {
            headers: {
                Authorization: "Bearer " + token
            },
            data: {
                id: appointmentIdToDelete
            }
            
        }).then(response => {
            console.log(response.data)
            setConfirmDelete([false, ""])
        }).catch(error => console.log(error.response.data))
        
    }


    const handleCancel = () => {
        setConfirmDelete([false, ""])
    }

    const handleConfirm = (e) => {
        setConfirmDelete([true, e.target.id])
    }

    const handleSuccess = () => {
        setSuccessDelete(false)
        
        const token = localStorage.getItem("token")

        axios.get('/api/patient/current', {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                dispatch(current(response.data))
            })
            .catch(error => console.log(error.response.data))
    }


    return (
    <div className='flex flex-1 flex-col justify-center items-center'>
        
        <h3 className='text-center text-[#06A9B2] font-bold mt-10 px-2 text-2xl'>Get your medical appointment with just one click!</h3>
        <div className='flex flex-col justify-center items-center mt-6 gap-6'>
            <div className='flex flex-col gap-6 md:flex-row md:gap-20'> 
                <fieldset className='flex justify-center items-center gap-3 relative'>
                    <img src="/Speciality.png" alt="Image hands and health" className='w-8'/>
                    <select ref={specialityRef} name="speciality" onChange={handleSpecialitySelect} onClick={handleInput} onFocus={handleSelectChange} 
                    className='font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4 relative' value={selectedDoctor.speciality}>
                        <option value="" >Please select a speciality...</option>
                        {SPECIALITIES.map((speciality, index) => (
                            <option key={index} value={speciality}>{speciality}</option>
                        ))}
                    </select>
                    {specialitySelected && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-17px] left-16'>Please select a speciality</p>}
                </fieldset>
                
                <fieldset className='flex justify-center items-center gap-3 relative'>
                    <img src="/Doctor.png" alt="Image doctor icon" className='w-8' />
                    <select ref={doctorRef} name="doctor" className='font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4' 
                    onClick={handleInput} onFocus={handleSelectChange} value={selectedDoctor.firstName + " " + selectedDoctor.lastName}>
                        <option value=""  >Please select a doctor...</option>
                        {filteredDoctors.map((doctor, index) => (
                            <option key={index} value={selectedDoctor.doctor}>{doctor.firstName + " " + doctor.lastName}</option>
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

export default Prueba