import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
// import UpdateIcon from "@mui/icons-material/Update";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";

import {
  getDoctors,
  deleteDoctor,
  createDoctor,
  updateDoctorFunc,
} from "../../API/doctor";
import "./Doctor.css";

//------------------------------Use State-----------------------------

function Doctor() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [reload, setReload] = useState(true);
  const [alert, setAlert] = useState(0);

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

  //------------------------------Use Effect-----------------------------
  useEffect(() => {
    getDoctors().then((data) => {
      setDoctors(data);
      setSearchResults(data);
    });
    setReload(false);
  }, [reload]);

  //------------------------------New Doctor-----------------------------
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
        setAlert(1);
        setTimeout(() => {
          setAlert(0); //ayni mail ise alert!
        }, 3000);
      });
  };

  //------------------------------Delete Doctor-----------------------------
  const handleDelete = (id) => {
    deleteDoctor(id).then(() => {
      setReload(true);
    });
  };

  //------------------------------Update Doctor-----------------------------
  const handleUpdateDoctorInputs = (event) => {
    setUpdateDoctor({
      ...updateDoctor,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateDoctorBtn = () => {
    updateDoctorFunc(updateDoctor)
      .then(() => {
        setReload(true);
        setUpdateDoctor({
          name: "",
          mail: "",
          address: "",
          city: "",
          phone: "",
        });
      })
      .catch((error) => {
        setAlert(2);
        setTimeout(() => {
          setAlert(0); //ayni mail ise alert!degismesi icin mail adresi degismeli
        }, 3000);
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

  //------------------------------Search Doctor-----------------------------
  const handleSearch = () => {
    const filteredDoctor = searchResults.filter((doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase())
    );
    setDoctors(filteredDoctor);
  };

  const handleReset = () => {
    setSearch("");
    setDoctors(searchResults);
  };

  return (
    <>
      {/*--------------------------New Doctor Input Button------------------------ */}
      <div className="container">
      <div className="doctor-newdoctor">
        <h1>Doktor Yonetimi</h1>
        <h3>Doktor Ekleme</h3>
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
        {alert === 1 ? (
          <Alert severity="error">
            This doctor has already been registered in the system!
          </Alert>
        ) : null}
      </div>

      {/*--------------------------Update Doctor Input Button------------------------ */}
      <div className="doctor-updatedoctor">
        <h3>Doktor Güncelleme</h3>

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
        {alert === 2 ? (
          <Alert severity="error">
            This doctor has already been registered in the system!
          </Alert>
        ) : null}
      </div>

      {/* ---------------------------Search Customer Input Button------------------------ */}
      <div className="search-bar">
        <h3>Doktor Ara</h3>
        <input
          type="text"
          placeholder="doktor giriniz... "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
        <button className="reset-button" onClick={handleReset}>
          Show All
        </button>
      </div>

      {/* ------------------------------List Doctor ----------------------------- */}
      <div className="list">
        <h3>Doktor Listesi</h3>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
              <th>Name Surname</th>
                <th>Phone</th>
                <th>Address</th>
                <th>City</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.name}</td>
                  <td>{doctor.phone}</td>
                  <td>{doctor.address}</td>
                  <td>{doctor.city}</td>
                  <td>{doctor.mail}</td>
                  <td>
                    <span onClick={() => handleUpdateIcon(doctor)}>
                      <UpdateIcon />
                    </span>
                    <span onClick={() => handleDelete(doctor.id)}>
                      <DeleteIcon />
                    </span>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Outlet />
      </div>
    </>
  );
}
export default Doctor;
