import React, { useState, useEffect } from 'react';


function App() {

    // Función para obtener la fecha actual en el formato YYYY-MM-DD
    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };



    // Estado para almacenar la fecha actual
    const [currentDate, setCurrentDate] = useState(getCurrentDate());

    // Estado para almacenar la fecha seleccionada por el usuario
    const [selectedDate, setSelectedDate] = useState(getCurrentDate());

    // Estado para almacenar los turnos del médico seleccionado
    const [doctorTurns, setDoctorTurns] = useState([]);


    useEffect(() => {
        setCurrentDate(getCurrentDate()); // Establecer la fecha actual cuando se monta el componente
    }, []);

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
        setCurrentDate(currentDateObj.toISOString().split('T')[0]);
    };

    // Función para cambiar la fecha seleccionada por el usuario
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        setCurrentDate(event.target.value);
    };

    // const selectTurn = (day, time) => {
    //     const selectedDateTime = new Date(day);
    //     selectedDateTime.setHours(time);
    //     console.log({
    //         fecha: selectedDateTime.toISOString().slice(0, 10),
    //         hora: `${time}:00`,
    //         medico: 'Nombre del Médico',
    //         paciente: 'Nombre del Paciente',
    //     });
    // };

    // Lógica para la selección de turnos de un médico específico
    const selectDoctor = (day, time) => {
        const selectedDateTime = new Date(day)
        selectedDateTime.setHours(time);
        
        const turno = {
            date: selectedDateTime.toISOString().slice(0, 10),
            time: `${time}:00`,
            medico: 'Medico', // Aquí deberías obtener el nombre del médico aquí el ID seleccionado
            paciente: 'Paciente', // Aquí podrías obtener el nombre del paciente si está logueado
            
        }
        console.log(turno);
        // Mostrar el objeto con console.log

        // Aquí deberías realizar una consulta a tu base de datos para obtener los turnos del médico seleccionado

        // Simulación de datos de turnos (reemplazar con la lógica de consulta a la base de datos)
        // const simulatedTurns = [
        //     { date: '2024-04-01', time: '09:00' },
        //     { date: '2024-04-02', time: '10:00' },
        //     { date: '2024-04-03', time: '11:00' },
        //     // Aquí deberías tener los turnos obtenidos de la base de datos
        // ];

        const turnoExistente = doctorTurns.find(turnoExistente => {
            return turnoExistente.date === turno.date && turnoExistente.time === turno.time && turnoExistente.medico === turno.medico && turnoExistente.paciente === turno.paciente;
        });

        if(turnoExistente) {
            alert("Turno ya agendado");
        } else {
            setDoctorTurns([...doctorTurns, turno]);
        }
    };

    console.log(doctorTurns);


    // Generar los días de la semana
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekDays = [];
    let currentDateObj = new Date(currentDate);
    for (let i = 0; i < 3; i++) {
        weekDays.push({
            date: currentDateObj.toISOString().split('T')[0],
            dayOfWeek: daysOfWeek[currentDateObj.getDay()],
            fullDate: currentDateObj.toLocaleDateString('en-EN', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' })
        });
        currentDateObj.setDate(currentDateObj.getDate() + 1);
        
    }


    return (
        <div className="container mx-auto py-8">
            <div className="flex items-center justify-between mb-4">
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
            <div className="grid grid-cols-3 gap-2">
                {weekDays.map((day, index) => (
                    <div key={index} className="border p-4">
                        <h2 className="font-semibold mb-2 text-center">{day.fullDate}</h2>
                        {[8, 9, 10, 11, 12].map((hour) => (
                            <button
                                key={hour}
                                onClick={() => selectDoctor(day.date, hour)}
                                className="block w-full py-2 px-4 bg-gray-200 rounded hover:bg-gray-300 mb-2"
                            >
                                {`${hour}:00`}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
            <div>
                <h2 className="text-xl font-semibold mt-8">Doctor's Turns</h2>
                <div>
                    <button onClick={() => selectDoctor(1)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Doctor 1
                    </button>
                    <button onClick={() => selectDoctor(2)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Doctor 2
                    </button>
                    {/* Agrega más botones de médicos según necesites */}
                </div>
                <ul>
                    {doctorTurns.map((turn, index) => (
                        <li key={index}>{`Date: ${turn.date}, Time: ${turn.time}`}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;


