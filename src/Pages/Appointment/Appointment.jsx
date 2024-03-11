import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";

import {
  getAppointments,
  deleteAppointment,
  createAppointment,
  updateAppointmentFunc,
} from "../../API/appointment";
import "./Appointment.css";
import { getDoctors } from "../../API/doctor";
import { getAnimals } from "../../API/animal";

function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [reload, setReload] = useState(true);

  const [newAppointment, setNewAppointment] = useState({
    appointmentDate: "",
    doctor: "",
    animal: "",
  });

  const [updateAppointment, setUpdateAppointment] = useState({
    appointmentDate: "",
    doctor: "",
    animal: "",
  });

  //New Appointment

  const handleNewAppointment = (event) => {
    if (event.target.name === "doctor") {
      setNewAppointment({
        ...newAppointment,
        doctor: {
          id: event.target.value,
        },
      });
    } else if (event.target.name === "animal") {
      setNewAppointment({
        ...newAppointment,
        animal: {
          id: event.target.value,
        },
      });
    } else {
      setNewAppointment({
        ...newAppointment,
        [event.target.name]: event.target.value,
      });
      
    }
    console.log(newAppointment);
  };

  const handleNewAppointmentBtn = () => {
    createAppointment(newAppointment).then(() => {
      console.log(newAppointment);
      setReload(true);
    });
    setNewAppointment({
      appointmentDate: "",
    doctor: "",
    animal: "",
    });
  };

  //Delete Appointment

  const handleDelete = (id) => {
    deleteAppointment(id).then(() => {
      setReload(true);
    });
  };

  //Update Appointment

  const handleUpdateAppointmentInputs = (event) => {
    if (event.target.name === "doctor"){
      setUpdateAppointment({
        ...updateAppointment,
        doctor: {
          id: event.target.value,
        },
      });

    } else if (event.target.name === "animal") {
      setUpdateAppointment({
        ...updateAppointment,
        animal: {
          id: event.target.value,
        },
      });
    } else {
      setUpdateAppointment({
        ...updateAppointment,
        [event.target.name]: event.target.value,
      });
    }
    
  };

  const handleUpdateAppointmentBtn = () => {
    updateAppointmentFunc(updateAppointment).then(() => {
      setReload(true);
    });
    setUpdateAppointment({
      appointmentDate: "",
      doctor: "",
      animal: "",
    });
  };

  // const handleUpdateIcon = (appointment) => {
  //   console.log(appointment);
  //   setUpdateAppointment(appointment);
  // };

//BU KISMI KONTROL ET!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


  const handleUpdateIcon = (appointment) => {
    setUpdateAppointment({
      appointmentDate: appointment.appointmentDate,
      doctor: appointment.doctor,
      animal: appointment.animal,
      id: appointment.id,
    });
  };

  useEffect(() => {
    getAppointments().then((data) => {
      setAppointments(data);
      console.log(data);
    });
    getDoctors().then((data) => {
      setDoctors(data);
      console.log(data);
    });
    getAnimals().then((data) => {
      setAnimals(data);
    });
    
    setReload(false);
  }, [reload]);

  return (
    <>
      <div className="appointment-newappointment">
        <h2>Randevu Ekleme</h2>
        <input
          type="datetime-local"
          placeholder="Randevu tarihi"
          name="appointmentDate"
          value={newAppointment.appointmentDate}
          onChange={handleNewAppointment}
        />

        <select name="doctor" onChange={handleNewAppointment}>
          <option value="" disabled={true} selected={true} >
            Randevu tarihi seciniz
          </option>
          {doctors.map((doctor) => {
            return <option value={doctor.id}>{doctor.name}</option>;
          })}
        </select>

        <select name="animal" onChange={handleNewAppointment}>
          <option value="" disabled={true} selected={true} >
            Hayvan seçiniz
          </option>
          {animals.map((animal) => {
            return <option value={animal.id}>{animal.name}</option>;
          })}
        </select>

        <button onClick={handleNewAppointmentBtn}>Create</button>
      </div>

      {/* ------------------------------------------------------ */}
      <div className="appointment-updateappointment">
        <h2>Randevu Güncelleme</h2>

        <input
           type="datetime-local"
           placeholder="Randevu tarihi"
           name="appointmentDate"
          value={updateAppointment.appointmentDate}
          onChange={handleUpdateAppointmentInputs}
        />
        
       <select name="doctor" onChange={handleUpdateAppointmentInputs}>
          <option value="" disabled={true} selected={true} >
            randevu seciniz
          </option>
          {doctors.map((doctor) => {
            return <option value={doctor.id}>{doctor.name}</option>;
          })}
        </select>

        <select name="animal" onChange={handleUpdateAppointmentInputs}>
          <option value="" disabled={true} selected={true} >
            Hayvan seçiniz
          </option>
          {animals.map((animal) => {
            return <option value={animal.id}>{animal.name}</option>;
          })}
        </select>

        <button onClick={handleUpdateAppointmentBtn}>Update</button>
      </div>

      {/* ------------------------------------------------------ */}
      <div className="list">
        <h2>Randevu Listesi</h2>
        {appointments.map((appointment) => (
          <div key={appointment.id}>
            <h3>
            {appointment.id} - {appointment.doctor.name} / {appointment.appointmentDate} 
              <span id={appointment.id} onClick={() => handleDelete(appointment.id)}>
                <DeleteIcon />
              </span>{" "}
              <span onClick={() => handleUpdateIcon(appointment)}>
                {" "}
                <UpdateIcon />{" "}
              </span>
            </h3>{" "}
            {/* {appointment.appointmentDate} */}
          </div>
        ))}
      </div>
    </>
  );
}

export default Appointment;
