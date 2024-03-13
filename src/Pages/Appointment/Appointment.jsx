import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
// import UpdateIcon from "@mui/icons-material/Update";
import UpdateIcon from "@mui/icons-material/Edit";

import {
  getAppointments,
  deleteAppointment,
  createAppointment,
  updateAppointmentFunc,
} from "../../API/appointment";
import "./Appointment.css";
import { getDoctors } from "../../API/doctor";
import { getAnimals } from "../../API/animal";

//------------------------------Use State-----------------------------
function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
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

  //------------------------------Use Effect-----------------------------
  useEffect(() => {
    getAppointments().then((data) => {
      setAppointments(data);
      setSearchResults(data);
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

  //------------------------------New Appointment-----------------------------

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
      doctor:{
        id: "",
      },
      animal:{
        id: "",

      } 
    });
  };

  //------------------------------Delete Appointment-----------------------------
  const handleDelete = (id) => {
    deleteAppointment(id).then(() => {
      setReload(true);
    });
  };

  //------------------------------Update Appointment-----------------------------

  const handleUpdateAppointmentInputs = (event) => {
    if (event.target.name === "doctor") {
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
      doctor:{
        id: "",
      },
      animal:{
        id: "",

      } 
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

    //------------------------------Search Appointment-----------------------------
    const handleSearch = () => {
      const filteredAppointment = searchResults.filter((appointment) =>
      appointment.appointmentDate.toLowerCase().includes(search.toLowerCase())
      );
      setAppointments(filteredAppointment);
      setSearch("");
    };


  return (
    <>
    {/*--------------------------New Appointment Input Button------------------------ */}
      <div className="appointment-newappointment">
        <h1>Randevu Yonetimi</h1>

        <h3>Randevu Ekle</h3>
        <input
          type="datetime-local"
          placeholder="Randevu tarihi"
          name="appointmentDate"
          value={newAppointment.appointmentDate}
          onChange={handleNewAppointment}
        />

        <select value={newAppointment.doctor.id} name="doctor" onChange={handleNewAppointment}>
          <option value="" disabled={true} selected={true}>
            doctor seciniz
          </option>
          {doctors.map((doctor) => {
            return <option value={doctor.id}>{doctor.name}</option>;
          })}
        </select>

        <select value={newAppointment.animal.id} name="animal" onChange={handleNewAppointment}>
          <option value="" disabled={true} selected={true}>
            Hayvan seçiniz
          </option>
          {animals.map((animal) => {
            return <option value={animal.id}>{animal.name}</option>;
          })}
        </select>

        <button onClick={handleNewAppointmentBtn}>Create</button>
      </div>

    {/*--------------------------Update Appointment Input Button------------------------ */}
      <div className="appointment-updateappointment">
        <h3>Randevu Güncelleme</h3>

        <input
          type="datetime-local"
          placeholder="Randevu tarihi"
          name="appointmentDate"
          value={updateAppointment.appointmentDate}
          onChange={handleUpdateAppointmentInputs}
        />

        <select value={updateAppointment.doctor.id} name="doctor" onChange={handleUpdateAppointmentInputs}>
          <option value="" disabled={true} selected={true}>
            randevu seciniz
          </option>
          {doctors.map((doctor) => {
            return <option value={doctor.id}>{doctor.name}</option>;
          })}
        </select>

        <select value={updateAppointment.animal.id} name="animal" onChange={handleUpdateAppointmentInputs}>
          <option value="" disabled={true} selected={true}>
            Hayvan seçiniz
          </option>
          {animals.map((animal) => {
            return <option value={animal.id}>{animal.name}</option>;
          })}
        </select>

        <button onClick={handleUpdateAppointmentBtn}>Update</button>
      </div>


      {/* ---------------------------Search Appointment Input Button------------------------ */}
      <div className="search-bar">
      <h3>Randevu Ara</h3>

      <select value={search} name="doctor" onChange={handleSearch}>
          <option value="" disabled={true} selected={true}>
            doctor seciniz
          </option>
          {doctors.map((doctor) => {
            return <option value={doctor.id}>{doctor.name}</option>;
           
          })}
        </select>
        
        <input
          type="date"
          placeholder="start-date "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

<input
          type="date"
          placeholder="end-date "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
      </div>
    


      {/* ------------------------------------------------------ */}
      <div className="list">
        <h3>Randevu Listesi</h3>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Doktor</th>
                <th>Randevu Tarihi</th>
                <th>Hayvan</th>
                <th>Musteri</th>
                <th>Musteri Telefon</th>
                <th>Doktor Telefon</th>
                <th>Islemler</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.doctor.name}</td>
                  <td>{appointment.appointmentDate}</td>
                  <td>{appointment.animal.name}</td>
                  <td>{appointment.animal.customer.name}</td>
                  <td>{appointment.animal.customer.phone}</td>
                  <td>{appointment.doctor.phone}</td>

                  <td>
                    <span onClick={() => handleUpdateIcon(appointment)}>
                      <UpdateIcon />
                    </span>
                    <span onClick={() => handleDelete(appointment.id)}>
                      <DeleteIcon />
                    </span>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Appointment;

{
  /* {appointments.map((appointment) => (
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
         
          </div>
        ))} */
}

{
  /* </div>
    </>
  );
}

export default Appointment; */
}
