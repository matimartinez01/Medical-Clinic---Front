import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import authActions from "../redux/actions/auth.actions"
import { useDispatch } from "react-redux"
import Swal from "sweetalert2"

// Función para obtener la fecha actual en el formato YYYY-MM-DD
const getCurrentDate = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const day = now.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
}



function CalendarAppointmentsAdmin({doctorConfirmed, patientConfirmed}) {
    // Estado para almacenar la fecha actual
    const [currentDate, setCurrentDate] = useState(getCurrentDate())
    // Estado para almacenar la fecha seleccionada por el usuario
    const [selectedDate, setSelectedDate] = useState(getCurrentDate())
    // Estado para almacenar los turnos del médico seleccionado
    const [doctorTurns, setDoctorTurns] = useState([])

    const dispatch = useDispatch()
    const { current } = authActions


    const user = useSelector(store => store.authReducer.user)

    const [doctor, setDoctor] = useState([])
    const [appointments, setAppointments] = useState([])
    const [emailDoctor, setEmailDoctor] = useState([])

    useEffect(() => {
        setDoctor(doctorConfirmed)
        setAppointments(doctor.appointments)
        setEmailDoctor(doctor.email)
        
    }), []


    // console.log(doctor)


    // Función para cambiar la fecha hacia adelante
    const nextWeek = () => {
        const currentDateObj = new Date(currentDate)
        currentDateObj.setDate(currentDateObj.getDate() + 3)
        setCurrentDate(currentDateObj.toISOString().split('T')[0])
    }

    // Función para cambiar la fecha hacia atrás
    const prevWeek = () => {
        const currentDateObj = new Date(currentDate)
        currentDateObj.setDate(currentDateObj.getDate() - 3)
        if(currentDateObj < new Date().setDate(new Date().getDate() - 1)) {
            console.log("Hola")
            currentDateObj.setDate(currentDateObj.getDate() + 3)
        }else{
            setCurrentDate(currentDateObj.toISOString().split('T')[0])
        }
    }

    // Función para cambiar la fecha seleccionada por el usuario
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value)
        setCurrentDate(event.target.value)
    }


    function selectHour(e) {
        let timeAndDate = e.target.value.split(",")
        console.log(timeAndDate[0])
        console.log(emailDoctor)
        console.log(timeAndDate[1])
        console.log(patientConfirmed)
        setConfirmAppointment(true)
        setTimeAndDate1(timeAndDate[1])
        setTimeAndDate0(timeAndDate[0])


        // Swal.fire({
        //     title: "YOUR APPOINTMENT",
        //     text: `Date: ${timeAndDate[1]}, Hour: ${timeAndDate[0]}, Doctor: ${doctor.firstName + " " + doctor.lastName}`,
        //     icon: "warning",
        //     showCancelButton: true,
        //     confirmButtonColor: "#3085d6",
        //     cancelButtonColor: "#d33",
        //     confirmButtonText: "CONFIRM!"
        // })
        // .then((result) => {
        //     if (result.isConfirmed) {
        //         axios.post("/api/appointment/",
        //             { date: timeAndDate[1], time: timeAndDate[0], emailDoctor: emailDoctor },
        //             { headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjp7ImF1dGhvcml0eSI6IlJPTEVfUEFUSUVOVCJ9LCJzdWIiOiJndWlsbGVwZXJlekBnbWFpbC5jb20iLCJpYXQiOjE3MTE1ODA1MjUsImV4cCI6MTcxMTU4NDEyNX0.aItBUz-9PNkWHCCoODFK63eM9I_uFhUTpRRO3nkvs_I" } },
        //         )
        //             .then(a => {
        //                 console.log(a.data)
        //                 setSuccessAppointment(true)
        //                 setTimeAndDate1(timeAndDate[1])
        //                 setTimeAndDate0(timeAndDate[0])
        //             })
        //             .catch(err => console.log(err.response.data))
                
                
                // .then(() => {
                //     window.location.reload()
                // })


                // Swal.fire({
                //     title: "Your appointment has been scheduled!",
                //     text: `Date: ${timeAndDate[1]}, Hour: ${timeAndDate[0]}, Doctor: ${doctor.firstName + " " + doctor.lastName}`,
                //     icon: "success"
                // })
            // }
        // })
    }


    const [confirmAppointment, setConfirmAppointment] = useState(false)
    const [successAppointment, setSuccessAppointment] = useState(false)

    const [timeAndDate1, setTimeAndDate1] = useState({})
    const [timeAndDate0, setTimeAndDate0] = useState({})


    
    

    const handleConfirm = () => {
        const token = localStorage.getItem("token")
        setConfirmAppointment(false)
        axios.post("/api/admin/appointment",
                    { date: timeAndDate1, time: timeAndDate0, emailDoctor: emailDoctor, emailPatient: patientConfirmed.email },
                    { headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjp7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifSwic3ViIjoibWF0aUBhZG1pbi5jb20iLCJpYXQiOjE3MTIwMDMyMzEsImV4cCI6MTcxMjAwNjgzMX0.cgyHO0WPfFFCOXVN9GaWm1_tUpmIr9ue_wlwX5DmwKQ" } },
                ).then(a => {
                    console.log(a.data)
                    setSuccessAppointment(true)
                })
                .catch(err => console.log(err.response.data))
    }

    const handleCancel = () => {
        setConfirmAppointment(false);
    }

    const handleSuccess = () => {
        window.location.reload()
    }


    // Generar los días de la semana
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const weekDays = []
    let currentDateObj = new Date(currentDate)
    for (let i = 0; i < 3; i++) {
        weekDays.push({
            date: currentDateObj.toISOString().split('T')[0],
            dayOfWeek: daysOfWeek[currentDateObj.getDay()],
            fullDate: currentDateObj.toLocaleDateString('en-EN', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' }),
            datePrueba: new Date(currentDateObj.toLocaleDateString('en-EN', { year: 'numeric', month: 'numeric', day: 'numeric' }).split(", ")).toISOString().split('T')[0],
        })
        currentDateObj.setDate(currentDateObj.getDate() + 1)
        
    }



    const [color, setColor] = useState("")

    return (
        <div className="container mx-auto mb-8">
            <div className='flex flex-col justify-center items-center mb-4 md:flex-row md:gap-8'>
                <p className="font-bold text-lg mb-2">Select a specific date:</p>
                <input type="date" value={selectedDate} onChange={handleDateChange} className="px-4 py-2 bg-gray-200 rounded-lg font-semibold text-gray-500"/>
            </div>

            {/* <div className="flex items-center justify-between gap-x-[100px] mb-4 px-4">
                <button onClick={prevWeek} className="px-4 py-2 bg-[#F19E22] text-white rounded-lg font-bold hover:bg-[#dc901e] w-32 md:hidden">Prev</button>
                <button onClick={nextWeek} className="px-4 py-2 bg-[#F19E22] text-white rounded-lg font-bold hover:bg-[#dc901e] w-32 md:hidden">Next</button>
            </div> */}
            
            <div className="flex justify-center items-center">

                <img src="/Prev.png" alt="Icon previous" className="w-[50px] cursor-pointer transition ease-in-out delay-100 hover:scale-110  duration-500" onClick={prevWeek}/>
                {/* max-[767px]:hidden */}

                <div className="grid md:grid-cols-3 gap-2 ml-2 mr-2 ">
                {/* grid grid-cols-3 gap-2 md:mt-6 ml-2 mr-2  */}

                {weekDays.map((day, index) => (
                    <div key={index} className={`border p-4 ${color} border-[#F19E22] border-[2px] rounded-xl max-w-[220px] bg-[#F19E22] bg-opacity-15 max-h-[205px] overflow-auto`} >
                        <h3 className="font-bold mb-2 text-center text-[#06A9B2]">{day.fullDate}</h3>
                        {doctor.workDays?.includes(day.dayOfWeek.toUpperCase()) && (
                            <div className="flex justify-center flex-wrap items-center gap-1">
                                {doctor.hours?.map((hour) => {
                                    let currentDate = new Date()
                                    const currentHour = currentDate.getHours()
                                    currentDate = currentDate.toISOString().split('T')[0]
                                    let appointmentDate = new Date(day.datePrueba)
                                    appointmentDate = appointmentDate.toISOString().split('T')[0]
                                    if (appointmentDate > currentDate || appointmentDate == currentDate && currentHour < hour) {
                                        const turnosCoincidentes = appointments?.filter(turno => turno.date === day.datePrueba && turno.time === hour)
                                        // Utiliza una expresión ternaria para renderizar condicionalmente el botón
                                        return turnosCoincidentes?.length === 0 ? (
                                            <button
                                                key={hour}
                                                value={[hour, day.datePrueba]}
                                                onClick={selectHour}
                                                className="block w-[70px] py-1 px-2 font-semibold bg-green-500 rounded hover:bg-green-700 mb-2 text-white"
                                            >
                                                {`${hour}:00`}
                                            </button>
                                        ) : (
                                            <button
                                                key={hour}
                                                className="block w-[70px] py-1 px-2 bg-gray-400 text-white rounded mb-2"
                                            >
                                                {`${hour}:00`}
                                            </button>
                                        )
                                    } else {
                                        return null
                                    }
                                })}
                            </div>
                        )}
                        {!doctor.workDays?.includes(day.dayOfWeek.toUpperCase()) && (
                            // <p className="text-center font-semibold text-gray-400 italic">The doctor {doctor?.firstName + " " + doctor?.lastName} doesn't work on this day.</p>
                            <p className="text-center font-semibold text-gray-400 italic">Without medical attention.</p>
                        )}

                    </div>
                    ))}
                </div>

                {/* <button onClick={nextWeek} className=" bg-[#F19E22] text-white rounded-lg font-bold hover:bg-[#dc901e] w-[70px] h-[40px]">Next</button> */}
                <img src="/Next.png" alt="Icon next" className="w-[50px] cursor-pointer transition ease-in-out delay-100 hover:scale-110  duration-500" onClick={nextWeek}/>
                {/* max-[767px]:hidden */}
            
            </div>
            

            <div className="flex gap-4 justify-evenly items-center mt-6">
                <div className="flex items-center gap-1">
                    <div className="flex w-6 h-6 rounded-md bg-green-500 "></div>
                    <p className="font-semibold">Available</p>
                </div>
                <div className="flex items-center gap-1">
                    <div className="flex w-6 h-6 rounded-md bg-gray-400 "></div>
                    <p className="font-semibold">Unavailable</p>
                </div>
            </div>
            
            <div>

                <ul>
                    {doctorTurns.map((turn, index) => (
                        <li key={index}>{`Date: ${turn.date}, Time: ${turn.time}`}</li>
                    ))}
                </ul>
            </div>

            {confirmAppointment && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className='text-center text-xl font-bold pb-4'>Appointment:</p>
                        <p>Date: <span className='font-bold'>{timeAndDate1}</span>, Hour: <span className="font-bold">{timeAndDate0} hs.</span></p>
                        <p>Doctor: <span className="font-bold">{doctor.firstName + " " + doctor.lastName}</span></p>
                        <p>Patient: <span className="font-bold">{patientConfirmed.firstName + " " + patientConfirmed.lastName}</span></p>
                        <div className="flex justify-center gap-4 mt-4">
                            <button className="bg-green-500 text-white font-bold py-2 rounded-md w-[90px]" onClick={handleConfirm}>Confirm</button>
                            <button className="bg-red-600 font-bold py-2 rounded-md w-[90px] text-white" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}


            {successAppointment && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className='text-center text-xl font-bold text-green-600'>The appointment</p>
                        <p className='text-center text-xl font-bold text-green-600'>has been scheduled!</p>
                        <p>Date: <span className='font-bold'>{timeAndDate1}</span>, Hour: <span className="font-bold">{timeAndDate0} hs.</span></p>
                        <p>Doctor: <span className="font-bold">{doctor.firstName + " " + doctor.lastName}</span></p>
                        <p>Patient: <span className="font-bold">{patientConfirmed.firstName + " " + patientConfirmed.lastName}</span></p>
                        <div className="flex justify-center gap-4 mt-4">
                            <button className="bg-green-500 text-white font-semibold py-2 rounded-md w-[90px]" onClick={handleSuccess}>Continue</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CalendarAppointmentsAdmin