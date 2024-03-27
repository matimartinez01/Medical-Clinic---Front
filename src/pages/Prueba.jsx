import React, { useRef, useState } from "react";
import { nanoid } from "nanoid";

    // Componente de Turno
    const Turno = ({ hora, disponible, onSelect }) => {
    const id = nanoid();
    const handleClick = () => {
        if (disponible) {
        onSelect(hora);
        }
    };

    return (
        <button
        onClick={handleClick}
        className={`p-2 m-1 w-20 text-center ${
            disponible ? "bg-green-500" : "bg-gray-300 cursor-not-allowed"
        }`}
        disabled={!disponible}
        >
        {hora}
        </button>
    );
    };

    // Componente de Calendario
    const Calendario = ({ medicos, onSaveCita }) => {
    const [selectedMedico, setSelectedMedico] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedHora, setSelectedHora] = useState(null);
    const [citas, setCitas] = useState([]);
    const fechaRef = useRef(null);
    console.log(fechaRef.current?.value);

    const handleSelectMedico = (medico) => {
        setSelectedMedico(medico);
        setSelectedHora(null); // Resetear la selección de hora al cambiar el médico
    };

    const handleSelectHora = (hora) => {
        setSelectedHora(hora);
    };

    const handleSaveCita = () => {
        if (selectedMedico && selectedHora) {
        // Obtener año, mes y día de la fecha seleccionada
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1; // Los meses van de 0 a 11 en JavaScript
        const day = selectedDate.getDate();

        // Formatear la fecha seleccionada
        const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
            day
        ).padStart(2, "0")}`;

        // Verificar si ya hay una cita programada para este médico y hora
        const citaExistente = citas.find(
            (cita) =>
            cita.fecha === formattedDate &&
            cita.medico.id === selectedMedico.id &&
            cita.hora === selectedHora
        );

        if (!citaExistente) {
            const nuevaCita = {
            medico: selectedMedico,
            fecha: formattedDate,
            hora: selectedHora,
            };

            setCitas((prevCitas) => [...prevCitas, nuevaCita]);
            onSaveCita(nuevaCita); // Guardar cita en la base de datos real o en el estado global
        } else {
            alert("Ya hay una cita programada para este médico y hora.");
        }
        setSelectedHora(null); // Resetear la selección de hora después de guardar la cita
        }
    };

    const handleNextMonth = () => {
        setSelectedDate((prevDate) => {
        const nextMonthDate = new Date(prevDate);
        nextMonthDate.setMonth(prevDate.getMonth() + 1);
        return nextMonthDate;
        });
    };

    const handlePrevMonth = () => {
        setSelectedDate((prevDate) => {
        const prevMonthDate = new Date(prevDate);
        prevMonthDate.setMonth(prevDate.getMonth() - 1);
        return prevMonthDate;
        });
    };

    const firstDayOfMonth = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        1
    );
    const lastDayOfMonth = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        0
    );

    const daysInMonth = [];
    for (
        let date = new Date(firstDayOfMonth);
        date <= lastDayOfMonth;
        date.setDate(date.getDate() + 1)
    ) {
        daysInMonth.push(new Date(date));
    }

    return (
        <div className="p-4">
        <h2 className="text-xl font-bold mb-4">
            Seleccione un médico y un horario:
        </h2>
        <div className="mb-4">
            <button onClick={handlePrevMonth} className="mr-2">
            Anterior
            </button>
            <span>
            {selectedDate.toLocaleDateString("es-ES", {
                month: "long",
                year: "numeric",
            })}
            </span>
            <button onClick={handleNextMonth} className="ml-2">
            Siguiente
            </button>
        </div>
        <div className="flex flex-wrap gap-4 mb-4">
            {medicos.map((medico) => (
            <button
                key={medico.id}
                onClick={() => handleSelectMedico(medico)}
                className={`p-2 bg-blue-500 text-white rounded ${
                selectedMedico && selectedMedico.id === medico.id && "bg-blue-700"
                }`}
            >
                {medico.nombre}
            </button>
            ))}
        </div>
        <div className="flex flex-wrap gap-4">

            {daysInMonth.map((date) => {
            const formattedDate = date.toISOString().split("T")[0];
            // console.log(formattedDate);
            const isDateDisponible = !selectedMedico?.citas.find(
                (cita) => cita.fecha === formattedDate
            );
            return (
                <div key={formattedDate} >
                <p className="mb-2" >
                    {date.toLocaleDateString("es-ES", {
                    weekday: "long",
                    day: "numeric",
                    })}
                </p>
                {Array.from({ length: 4 }, (_, index) => index + 8).map(
                    (hora) => (
                    <Turno
                        key={hora}
                        hora={`${hora}:00`}
                        disponible={isDateDisponible}
                        onSelect={handleSelectHora}
                    />
                    )
                )}
                </div>
            );
            })}
        </div>
        <button
            onClick={handleSaveCita}
            className="mt-4 p-2 bg-green-500 text-white rounded"
            disabled={!selectedHora}
        >
            Guardar Cita
        </button>
        </div>
    );
    };

    // Componente principal
    const App = () => {
    // Datos de prueba para los médicos y citas (simulación de la base de datos)
    const [citas, setCitas] = useState([]);
    const [medicos] = useState([
        { id: "1", nombre: "Dr. Pérez", citas: [] },
        { id: "2", nombre: "Dr. Gómez", citas: [] },
        // Puedes agregar más médicos aquí
    ]);

    console.log(citas);

    const handleSaveCita = (cita) => {
        setCitas((prevCitas) => [...prevCitas, cita]); // Usar la versión de función de actualización del estado
        const medicoIndex = medicos.findIndex(
        (medico) => medico.id === cita.medico.id
        );
        if (medicoIndex !== -1) {
        const newMedicos = [...medicos];
        newMedicos[medicoIndex].citas.push({ hora: cita.hora });
        // Aquí deberías actualizar la base de datos real con los nuevos datos de los médicos
        }
    };

    return (
        <div className="container mx-auto">
        <h1 className="text-3xl font-bold my-4">Gestión de Citas Médicas</h1>
        <Calendario medicos={medicos} onSaveCita={handleSaveCita} />
        </div>
    );
    };

export default App;
