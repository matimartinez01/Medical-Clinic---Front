import React from 'react';

function Appointment() {

  return (
    <div className={`appointment ${isAvailable ? 'available' : 'reserved'}`}>
      <h3>{doctor}</h3>
      <p>{date}</p>
      <ul>
        {timeSlots.map((timeSlot, index) => (
          <li key={index} onClick={() => handleClick(timeSlot.time)}>
            {timeSlot.time} - {timeSlot.reserved ? 'Reservado' : 'Libre'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Appointment;