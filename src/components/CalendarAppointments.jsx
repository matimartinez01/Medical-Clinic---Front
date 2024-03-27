import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// Función para obtener la fecha actual en el formato YYYY-MM-DD
const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};



function CalendarAppointments({doctorConfirmed}) {
    // Estado para almacenar la fecha actual
    const [currentDate, setCurrentDate] = useState(getCurrentDate());
    // Estado para almacenar la fecha seleccionada por el usuario
    const [selectedDate, setSelectedDate] = useState(getCurrentDate());
    // Estado para almacenar los turnos del médico seleccionado
    const [doctorTurns, setDoctorTurns] = useState([]);


    const [doctor, setDoctor] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [emailDoctor, setEmailDoctor] = useState([]);

    useEffect(() => {
        setDoctor(doctorConfirmed);
        setAppointments(doctor.appointments);
        setEmailDoctor(doctor.email);
        
    }), [];


    console.log(doctor);


    // useEffect(() => {
    //     axios.get("/api/doctor/all")
    //         .then(response => {
    //             setDoctor(response.data)
    //             console.log(response.data);
    //         })
    //         .catch(error => console.log(error.response.data))
    //     }
    
    //     , []);


    // Función para cambiar la fecha hacia adelante
    const nextWeek = () => {
        const currentDateObj = new Date(currentDate);
        currentDateObj.setDate(currentDateObj.getDate() + 3);
        setCurrentDate(currentDateObj.toISOString().split('T')[0]);
    };

    // Función para cambiar la fecha hacia atrás
    const prevWeek = () => {
        const currentDateObj = new Date(currentDate);
        currentDateObj.setDate(currentDateObj.getDate() - 3);
        if(currentDateObj < new Date().setDate(new Date().getDate() - 1)) {
            console.log("Hola")
            currentDateObj.setDate(currentDateObj.getDate() + 3);
        }else{
            setCurrentDate(currentDateObj.toISOString().split('T')[0]);
        }
    };

    // Función para cambiar la fecha seleccionada por el usuario
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        setCurrentDate(event.target.value);
    };


    function selectHour(e){
        let timeAndDate = e.target.value.split(",");
        console.log(timeAndDate[0])
        console.log(emailDoctor)
        console.log(timeAndDate[1])
        Swal.fire({
            title: "YOUR APPOINTMENT",
            text: `Date: ${timeAndDate[1]}, Hour: ${timeAndDate[0]}, Doctor: ${doctor.firstName + " " + doctor.lastName}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "CONFIRM!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post("/api/appointment/", 
                {date: timeAndDate[1], time: timeAndDate[0], emailDoctor: emailDoctor},
                {headers: {Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjp7ImF1dGhvcml0eSI6IlJPTEVfUEFUSUVOVCJ9LCJzdWIiOiJndWlsbGVwZXJlekBnbWFpbC5jb20iLCJpYXQiOjE3MTE1Nzc4OTIsImV4cCI6MTcxMTU4MTQ5Mn0.KqXUQrpvygGOPE6AVK0Yss7-lsnthAI-EFjZ2W1yrzg"}},
                )
                .then(a => {
                    console.log(a.data)
                })
                .catch(err => console.log(err.response.data))
            Swal.fire({
                title: "Your appointment has been scheduled!",
                text:  `Date: ${timeAndDate[1]}, Hour: ${timeAndDate[0]}, Doctor: ${doctor.firstName + " " + doctor.lastName}`,
                icon: "success"
            }).then(() => {
                window.location.reload()
            })
            }
        })
    }
    



    // Generar los días de la semana
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekDays = [];
    let currentDateObj = new Date(currentDate);
    for (let i = 0; i < 3; i++) {
        weekDays.push({
            date: currentDateObj.toISOString().split('T')[0],
            dayOfWeek: daysOfWeek[currentDateObj.getDay()],
            fullDate: currentDateObj.toLocaleDateString('en-EN', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' }),
            datePrueba: new Date(currentDateObj.toLocaleDateString('en-EN', { year: 'numeric', month: 'numeric', day: 'numeric' }).split(", ")).toISOString().split('T')[0],
        });
        currentDateObj.setDate(currentDateObj.getDate() + 1);
        
    }





    const [color, setColor] = useState("")

    return (
        <div className="container mx-auto py-8">
            <div className="flex items-center justify-center gap-x-[100px] mb-4">
                <button onClick={prevWeek} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Last Week
                </button>
                <button onClick={nextWeek} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Next Week
                </button>
            </div>
            <div className='flex justify-center'>
                <input type="date" value={selectedDate} onChange={handleDateChange} className="px-4 py-2 bg-gray-200 rounded" />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-6 ml-2 mr-2">
            {weekDays.map((day, index) => (
    <div key={index} className={`border p-4 ${color}`}>
        <h2 className="font-semibold mb-2 text-center">{day.fullDate}</h2>
        {doctor.workDays?.includes(day.dayOfWeek.toUpperCase()) && (
            <>
                {doctor.hours?.map((hour) => {
                    let currentDate = new Date();
                    const currentHour = currentDate.getHours();
                    currentDate = currentDate.toISOString().split('T')[0];
                    let appointmentDate = new Date(day.datePrueba)
                    appointmentDate = appointmentDate.toISOString().split('T')[0];
                    if (appointmentDate > currentDate || appointmentDate == currentDate && currentHour < hour) {
                    const turnosCoincidentes = appointments?.filter(turno => turno.date === day.datePrueba && turno.time === hour);
                    // Utiliza una expresión ternaria para renderizar condicionalmente el botón
                    return turnosCoincidentes?.length === 0 ? (
                        <button
                            key={hour}
                            value={[hour, day.datePrueba]}
                            onClick={selectHour}
                            className="block w-full py-2 px-4 bg-blue-600 rounded hover:bg-gray-300 mb-2"
                        >
                            {`${hour}:00`}
                        </button>
                    ) :  (
                        <button
                            key={hour}
                            className="block w-full py-2 px-4 bg-blue-300 text-white rounded mb-2"
                        >
                            {`${hour}:00`}
                        </button>
                    );
                } else{
                    return null
                }
                })}
            </> 
                )}
                {!doctor.workDays?.includes(day.dayOfWeek.toUpperCase()) && (
                    <h1>The doctor {doctor?.firstName + " " + doctor?.lastName} doesn't work on this day</h1>
                )}
                    
    </div>
))}
            </div>
            <div>
                
                <ul>
                    {doctorTurns.map((turn, index) => (
                        <li key={index}>{`Date: ${turn.date}, Time: ${turn.time}`}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CalendarAppointments;