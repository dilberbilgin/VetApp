import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Alert from "@mui/material/Alert";

import {
  getDoctors,
  deleteDoctor,
  createDoctor,
  updateDoctorFunc,
} from "../../API/doctor";
import "./Doctor.css";

function Doctor() {
  const [doctors, setDoctors] = useState([]);
  const [reload, setReload] = useState(true);
  const [alert, setAlert] = useState(false);

  const [newDoctor, setNewDoctor] = useState({
    name: "",
    mail: "",
    address: "",
    city: "",
    phone: "",
  });

  const [updateDoctor, setUpdateDoctor] = useState({
    name: "",
    mail: "",
    address: "",
    city: "",
    phone: "",
  });

  //New Doctor

  const handleNewDoctor = (event) => {
    setNewDoctor({
      ...newDoctor,
      [event.target.name]: event.target.value,
    });
    console.log(newDoctor);
  };

  const handleNewDoctorBtn = () => {
    createDoctor(newDoctor)
      .then(() => {
        console.log(newDoctor);
        setReload(true);
        setNewDoctor({
          name: "",
          mail: "",
          address: "",
          city: "",
          phone: "",
        });
      })
      .catch((error) => {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      });
  };

  //Delete Doctor

  const handleDelete = (id) => {
    deleteDoctor(id).then(() => {
      setReload(true);
    });
  };

  //Update Doctor

  const handleUpdateDoctorInputs = (event) => {
    setUpdateDoctor({
      ...updateDoctor,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateDoctorBtn = () => {
    updateDoctorFunc(updateDoctor).then(() => {
      setReload(true);
    });
    setUpdateDoctor({
      name: "",
      mail: "",
      address: "",
      city: "",
      phone: "",
    });
  };

  // const handleUpdateIcon = (doctor) => {
  //   console.log(doctor);
  //   setUpdateDoctor(doctor);
  // };

  const handleUpdateIcon = (doctor) => {
    setUpdateDoctor({
      name: doctor.name,
      mail: doctor.mail,
      address: doctor.address,
      city: doctor.city,
      phone: doctor.phone,
      id: doctor.id,
    });
  };

  useEffect(() => {
    getDoctors().then((data) => {
      setDoctors(data);
      console.log(data);
    });
    setReload(false);
  }, [reload]);

  // ---------------------------------------------------------------

  // const filteredDoctors = doctors.filter((doctor) => doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  // const handleSearchTermChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  return (
    <>
      <div className="doctor-newdoctor">
        <h2>Doktor Ekleme</h2>
        <input
          type="text"
          placeholder="Adi"
          name="name"
          value={newDoctor.name}
          onChange={handleNewDoctor}
        />
        <input
          type="text"
          placeholder="Telefon"
          name="phone"
          value={newDoctor.phone}
          onChange={handleNewDoctor}
        />
        <input
          type="text"
          placeholder="E-mail"
          name="mail"
          value={newDoctor.mail}
          onChange={handleNewDoctor}
        />
        <input
          type="text"
          placeholder="Adres"
          name="address"
          value={newDoctor.address}
          onChange={handleNewDoctor}
        />
        <input
          type="text"
          placeholder="Sehir"
          name="city"
          value={newDoctor.city}
          onChange={handleNewDoctor}
        />
        <button onClick={handleNewDoctorBtn}>Create</button>
        {alert && (
          <Alert severity="error">
            This doctor has already been registered in the system!
          </Alert>
        )}
      </div>

      {/* ------------------------------------------------------ */}
      <div className="doctor-updatedoctor">
        <h2>Doktor Güncelleme</h2>

        <input
          type="text"
          placeholder="Adi"
          name="name"
          value={updateDoctor.name}
          onChange={handleUpdateDoctorInputs}
        />
        <input
          type="text"
          placeholder="Telefon"
          name="phone"
          value={updateDoctor.phone}
          onChange={handleUpdateDoctorInputs}
        />
        <input
          type="text"
          placeholder="E-mail"
          name="mail"
          value={updateDoctor.mail}
          onChange={handleUpdateDoctorInputs}
        />
        <input
          type="text"
          placeholder="Adres"
          name="address"
          value={updateDoctor.address}
          onChange={handleUpdateDoctorInputs}
        />
        <input
          type="text"
          placeholder="Sehir"
          name="city"
          value={updateDoctor.city}
          onChange={handleUpdateDoctorInputs}
        />
        <button onClick={handleUpdateDoctorBtn}>Update</button>
      </div>
{/* ---------------------------------------------------------------- */}
      {/* <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div> */}

      {/* ------------------------------------------------------ */}
      <div className="list">
        <h2>Doktor Listesi</h2>
        {doctors.map((doctor) => (
          <div key={doctor.id}>
            <h3>
              {doctor.name} {doctor.id}
              <span id={doctor.id} onClick={() => handleDelete(doctor.id)}>
                <DeleteIcon />
              </span>{" "}
              <span onClick={() => handleUpdateIcon(doctor)}>
                {" "}
                <UpdateIcon />{" "}
              </span>
            </h3>{" "}
            {doctor.address}
          </div>
        ))}
      </div>
      <Outlet />
    </>
  );
}

export default Doctor;
