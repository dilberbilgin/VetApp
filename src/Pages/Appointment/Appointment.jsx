import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
// import UpdateIcon from "@mui/icons-material/Update";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";

import {
  getAppointments,
  deleteAppointment,
  createAppointment,
  updateAppointmentFunc,
  getAppointmentByDateDoctor,
  getAppointmentByDateAnimal,
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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [animalId, setAnimalId] = useState("");
  const [alert, setAlert] = useState(0);

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
    });
    getDoctors().then((data) => {
      setDoctors(data);
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
    createAppointment(newAppointment)
      .then(() => {
        setReload(true);
        setNewAppointment({
          appointmentDate: "",
          doctor: {
            id: "",
          },
          animal: {
            id: "",
          },
        });
      })
      .catch((error) => {
        setAlert(1);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
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
    updateAppointmentFunc(updateAppointment)
      .then(() => {
        setReload(true);
        setUpdateAppointment({
          appointmentDate: "",
          doctor: {
            id: "",
          },
        });
      })
      .catch((error) => {
        setAlert(2);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  const handleUpdateIcon = (appointment) => {
    setUpdateAppointment({
      appointmentDate: appointment.appointmentDate,
      doctor: appointment.doctor,
      animal: appointment.animal,
      id: appointment.id,
    });
  };

  //------------------------------Search Appointment-----------------------------
  //Doctor-Dates
  const handleSearchDoctorChange = (event) => {
    setDoctorId(event.target.value);
    const filteredAppointment = searchResults.filter((appointment) =>
      appointment.appointmentDate.toLowerCase().includes(search.toLowerCase())
    );
    setAppointments(filteredAppointment);
    setSearch("");
  };

  const handleDoctorDateSearchBtn = () => {
    getAppointmentByDateDoctor(startDate, endDate, doctorId).then((data) => {
      setAppointments(data);
    });
  };

  //Animal-Dates
  const handleSearchAnimalChange = (event) => {
    setAnimalId(event.target.value);
    const filteredAppointment = searchResults.filter((appointment) =>
      appointment.appointmentDate.toLowerCase().includes(search.toLowerCase())
    );
    setAppointments(filteredAppointment);
    setSearch("");
  };

  const handleAnimalDateSearchBtn = () => {
    getAppointmentByDateAnimal(startDate, endDate, animalId).then((data) => {
      setAppointments(data);
    });
  };

  const handleReset = () => {
    setSearch("");
    setDoctorId("");
    setAnimalId("");
    setAppointments(searchResults);
  };

  // const handleReset = () => {
  //   setSearch("");
  //   setStartDate("");
  //   setEndDate("");
  //   setDoctorId("");
  //   setAnimalId("");
  //   setAppointments(searchResults);
  // };

  return (
    <div className="container">
      {/*--------------------------New Appointment Input Button------------------------ */}
      <div className="appointment-newappointment">
        <h1>Appointment Management</h1>

        <h3>Add Appointment</h3>
        <input
          type="datetime-local"
          placeholder="Appointment date"
          name="appointmentDate"
          value={newAppointment.appointmentDate}
          onChange={handleNewAppointment}
        />

        <select
          value={newAppointment.doctor.id}
          name="doctor"
          onChange={handleNewAppointment}
        >
          <option value="" disabled={true} selected={true}>
            Select doctor
          </option>
          {doctors.map((doctor) => {
            return (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            );
          })}
        </select>

        <select
          value={newAppointment.animal.id}
          name="animal"
          onChange={handleNewAppointment}
        >
          <option value="" disabled={true} selected={true}>
            Select animal
          </option>
          {animals.map((animal) => {
            return (
              <option key={animal.id} value={animal.id}>
                {animal.name}
              </option>
            );
          })}
        </select>

        <button onClick={handleNewAppointmentBtn}>Create</button>
        {alert === 1 ? (
          <Alert severity="error">
            "The doctor is not available for today. Please choose a new date."
          </Alert>
        ) : null}
      </div>

      {/*--------------------------Update Appointment Input Button------------------------ */}
      <div className="appointment-updateappointment">
        <h3>Update Appointment</h3>

        <input
          type="datetime-local"
          placeholder="Appointment date"
          name="appointmentDate"
          value={updateAppointment.appointmentDate}
          onChange={handleUpdateAppointmentInputs}
        />

        <select
          value={updateAppointment.doctor.id}
          name="doctor"
          onChange={handleUpdateAppointmentInputs}
        >
          <option value="" disabled={true} selected={true}>
            Select appointment
          </option>
          {doctors.map((doctor) => {
            return <option value={doctor.id}>{doctor.name}</option>;
          })}
        </select>

        <select
          value={updateAppointment.animal.id}
          name="animal"
          onChange={handleUpdateAppointmentInputs}
        >
          <option value="" disabled={true} selected={true}>
            Select animal
          </option>
          {animals.map((animal) => {
            return <option value={animal.id}>{animal.name}</option>;
          })}
        </select>

        <button onClick={handleUpdateAppointmentBtn}>Update</button>
        {alert === 2 ? (
          <Alert severity="error">
            An appointment has already been scheduled for this date!
          </Alert>
        ) : null}
      </div>

      {/* ---------------------------Search Appointment Input Button------------------------ */}
      <div className="search-bar-appointment">
        <div className="search-bar">
          <h3>Search Appointment by Doctor and Date</h3>

          <select
            value={doctorId}
            name="doctor"
            onChange={handleSearchDoctorChange}
          >
            <option value="" disabled={true} selected={true}>
              Select doctor
            </option>
            {doctors.map((doctor) => {
              return <option value={doctor.id}>{doctor.name}</option>;
            })}
          </select>

          <input
            type="datetime-local"
            placeholder="start-date "
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <input
            type="datetime-local"
            placeholder="end-date "
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <button onClick={handleDoctorDateSearchBtn}>Search</button>
        </div>

        {/* -------------------------- */}

        <div className="search-bar">
          <h3>Search Appointment by Animal Name and Date</h3>

          <select
            value={animalId}
            name="animal"
            onChange={handleSearchAnimalChange}
          >
            <option value="" disabled={true} selected={true}>
              Select animal
            </option>
            {animals.map((animal) => {
              return <option value={animal.id}>{animal.name}</option>;
            })}
          </select>

          <input
            type="datetime-local"
            placeholder="start-date "
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <input
            type="datetime-local"
            placeholder="end-date "
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <button onClick={handleAnimalDateSearchBtn}>Search</button>
        </div>

        <button className="reset" onClick={handleReset}>
          Show All
        </button>
      </div>

      {/* ---------------------------List Appointment------------------------ */}
      <div className="list">
        <h3>Randevu Listesi</h3>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Appointment Date</th>
                <th>Animal</th>
                <th>Customer</th>
                <th>Customer Phone</th>
                <th>Doctor Phone</th>
                <th>Actions</th>
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
    </div>
  );
}

export default Appointment;
