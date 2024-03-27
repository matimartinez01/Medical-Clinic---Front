import React, { useState } from 'react';

// Función para obtener la fecha actual en el formato YYYY-MM-DD
const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function App() {
  // Estado para almacenar la fecha actual
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  // Estado para almacenar la fecha seleccionada por el usuario
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());

  // Función para cambiar la fecha hacia adelante
  const nextWeek = () => {
    const currentDateObj = new Date(currentDate);
    currentDateObj.setDate(currentDateObj.getDate() + 7);
    setCurrentDate(currentDateObj.toISOString().split('T')[0]);
  };

  // Función para cambiar la fecha hacia atrás
  const prevWeek = () => {
    const currentDateObj = new Date(currentDate);
    currentDateObj.setDate(currentDateObj.getDate() - 7);
    setCurrentDate(currentDateObj.toISOString().split('T')[0]);
  };

  // Función para cambiar la fecha seleccionada por el usuario
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setCurrentDate(event.target.value);
  };

  // Lógica para la selección de turnos
  const selectTurn = (day, time) => {
    const selectedDateTime = new Date(day);
    selectedDateTime.setHours(time);
    console.log({
      fecha: selectedDateTime.toISOString().slice(0, 10),
      hora: `${time}:00`,
      medico: 'Nombre del Médico',
      paciente: 'Nombre del Paciente',
    });
  };


  // Generar los días de la semana
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekDays = [];
  let currentDateObj = new Date(currentDate);
  for (let i = 0; i < 7; i++) {
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
        <input type="date" value={selectedDate} onChange={handleDateChange} className="px-4 py-2 bg-gray-200 rounded" />
        <button onClick={nextWeek} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Next Week
        </button>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day, index) => (
          <div key={index} className="border p-4">
            <h2 className="font-semibold mb-2 text-center">{day.fullDate}</h2>
            {[8, 9, 10, 11, 12].map((hour) => (
              <button
                key={hour}
                onClick={() => selectTurn(day.date, hour)}
                className="block w-full py-2 px-4 bg-gray-200 rounded hover:bg-gray-300 mb-2"
              >
                {`${hour}:00`}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
