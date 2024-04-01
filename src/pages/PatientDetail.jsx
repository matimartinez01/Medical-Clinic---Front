import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import authActions from '../redux/actions/auth.actions.js'
import { useParams } from 'react-router-dom'

const PatientDetail = () => {

    const [doctors, setDoctors] = useState([])
    console.log(doctors)

    let user = {

    }
    const [users, setUsers] = useState([])

    const params = useParams();

    const { login, current } = authActions
    const dispatch = useDispatch()

    useEffect(() => {
        
            axios.get("/api/patient/all", {
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjp7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifSwic3ViIjoibWF0aUBhZG1pbi5jb20iLCJpYXQiOjE3MTIwMDU5MDUsImV4cCI6MTcxMjAwOTUwNX0.0aFKSv2-izkH6ykbnjco7TIN300c4hjp79KNH3XvPMs"
                }
            })
                .then(res => {
                    // dispatch(current(res.data))
                    console.log(res.data);
                    setUsers(res.data)

                    
                })
                .catch(err => console.log(err))
        

    }, [])

    console.log(users);
    user = users?.find(user => user.id == params.id)

    // console.log(params.id);

    console.log(user);

    useEffect(() => {
        axios.get('/api/doctor/all')
            .then(response => {
                setDoctors(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    const findDoctorSpecialty = (doctorName) => {
        const doctor = doctors.find(doc => doc.firstName + ' ' + doc.lastName === doctorName);
        console.log(doctor)
        return doctor ? doctor.speciality : '';
    };


    return (
        <main className='flex flex-col gap-6 items-center py-4'>
            
            <section className='flex flex-col items-center'>
                <h1 className='text-2xl text-[#06A9B2] font-semibold py-4 text- center'>Patient</h1>
                <article className='w-[300px]'>
                    <p className='font-semibold text-lg'>ID: <span className='font-normal'>{user?.id}</span></p>
                    <p className='font-semibold text-lg'>NAME: <span className='font-normal'>{user?.firstName} {user?.lastName}</span></p>
                    <p className='font-semibold text-lg'>GENRE: <span className='font-normal'>{user?.genre}</span></p>
                    <p className='font-semibold text-lg'>BIRTH DATE: <span className='font-normal'>{user?.birthDate}</span></p>
                </article>
            </section>


            <section className='flex flex-col items-center'>
                <h2 className='text-2xl text-[#06A9B2] font-semibold py-4 text- center'>Appoiments</h2>
                <table className='bg-stone-800 flex flex-col p-3 rounded-lg w-[369px]'>
                    <thead className='text-neutral-400 border-b-2 border-neutral-300'>
                        <tr className='flex pb-4 justify-center'>
                            <th className='w-[20%]'>Doctor</th>
                            <th className='w-[35%]'>Specialtie</th>
                            <th className='w-[30%]'>Date</th>
                            <th className='w-[15%]'>Hour</th>
                        </tr>
                    </thead>
                    <tbody className='text-white flex flex-col'>
                        {user?.appointments?.map(appointment => (
                            <tr key={appointment.id} className='flex py-4 justify-center text-center text-sm'>
                                <td className='w-[20%]'>{appointment.doctor}</td>
                                <td className='w-[35%]'>{findDoctorSpecialty(appointment.doctor)}</td>
                                <td className='w-[30%]'>{appointment.date}</td>
                                <td className='w-[15%]'>{appointment.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default PatientDetail