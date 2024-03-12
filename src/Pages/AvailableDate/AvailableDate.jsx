import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";

import {
  getAvailableDates,
  deleteAvailableDate,
  createAvailableDate,
  updateAvailableDateFunc,
} from "../../API/availableDate";
import "./AvailableDate.css";
import { getDoctors } from "../../API/doctor";

function AvailableDate() {
  const [availableDates, setAvailableDates] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [reload, setReload] = useState(true);

  const [newAvailableDate, setNewAvailableDate] = useState({
    availableDate: "",
    doctor: "",
  });

  const [updateAvailableDate, setUpdateAvailableDate] = useState({
    availableDate: "",
    doctor: "",
  });

  //New AvailableDate

  const handleNewAvailableDate = (event) => {
    if (event.target.name === "doctor") {
      setNewAvailableDate({
        ...newAvailableDate,
        doctor: {
          id: event.target.value,
        },
      });
    } else {
      setNewAvailableDate({
        ...newAvailableDate,
        [event.target.name]: event.target.value,
      });
    }
    console.log(newAvailableDate);
  };

  const handleNewAvailableDateBtn = () => {
    createAvailableDate(newAvailableDate).then(() => {
      console.log(newAvailableDate);
      setReload(true);
    });
    setNewAvailableDate({
      availableDate: "",
      doctor: {
        id:"",
      },
    });
  };

  //Delete AvailableDate

  const handleDelete = (id) => {
    deleteAvailableDate(id).then(() => {
      setReload(true);
    });
  };

  //Update AvailableDate

  const handleUpdateAvailableDateInputs = (event) => {
    if (event.target.name === "doctor") {
      setUpdateAvailableDate({
        ...updateAvailableDate,
        doctor: {
          id: event.target.value,
        },
      });
    } else {
      setUpdateAvailableDate({
        ...updateAvailableDate,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdateAvailableDateBtn = () => {
    updateAvailableDateFunc(updateAvailableDate).then(() => {
      setReload(true);
    });
    setUpdateAvailableDate({
      availableDate: "",
      doctor: "",
    });
  };

  // const handleUpdateIcon = (availableDate) => {
  //   console.log(availableDate);
  //   setUpdateAvailableDate(availableDate);
  // };

  const handleUpdateIcon = (availableDate) => {
    setUpdateAvailableDate({
      availableDate: availableDate.availableDate,
      doctor: availableDate.doctor,
      id: availableDate.id,
    });
  };

  useEffect(() => {
    getAvailableDates().then((data) => {
      setAvailableDates(data);
      console.log(data);
    });
    getDoctors().then((data) => {
      setDoctors(data);
      console.log(data);
    });
    setReload(false);
  }, [reload]);

  return (
    <>
      <div className="availabledate-newawailabledate">
        <h2>Musait Gun Ekleme</h2>
        <input
          type="date"
          placeholder="Musait Gun"
          name="availableDate"
          value={newAvailableDate.availableDate}
          onChange={handleNewAvailableDate}
        />
        

        <select value={newAvailableDate.doctor.id} name="doctor" onChange={handleNewAvailableDate}>
          <option value="" disabled={true} selected={true}>
            doktor seciniz
          </option>
          {doctors.map((doctor) => {
            return <option value={doctor.id}>{doctor.name}</option>;
          })}
        </select>

        <button onClick={handleNewAvailableDateBtn}>Create</button>
      </div>

      {/* ------------------------------------------------------ */}
      <div className="availabledate-updateavailabledate">
        <h2>Musait Gun Güncelleme</h2>

        <input
          type="date"
          placeholder="Musait Gun"
          name="availableDate"
          value={updateAvailableDate.availableDate}
          onChange={handleUpdateAvailableDateInputs}
        />
       
        
        <select name="doctor" onChange={handleUpdateAvailableDateInputs}>
          <option value="" disabled={true} selected={true}>
            doctor seciniz
          </option>
          {doctors.map((doctor) => {
            return <option value={doctor.id}>{doctor.name}</option>;
          })}
        </select>

        <button onClick={handleUpdateAvailableDateBtn}>Update</button>
      </div>

      {/* ------------------------------------------------------ */}
      <div className="list">
        <h2>Musait Gun Listesi</h2>
        {availableDates.map((availableDate) => (
          <div key={availableDate.id}>
            <h3>
            {availableDate.id} - {availableDate.doctor.name} / {availableDate.availableDate}
              <span id={availableDate.id} onClick={() => handleDelete(availableDate.id)}>
                <DeleteIcon />
              </span>{" "}
              <span onClick={() => handleUpdateIcon(availableDate)}>
                {" "}
                <UpdateIcon />{" "}
              </span>
            </h3>{" "}
            {/* {availableDate.availableDate} */}
          </div>
        ))}
      </div>
    </>
  );
}

export default AvailableDate;
