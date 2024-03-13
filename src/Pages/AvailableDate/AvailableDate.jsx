import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
// import UpdateIcon from "@mui/icons-material/Update";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";

import {
  getAvailableDates,
  deleteAvailableDate,
  createAvailableDate,
  updateAvailableDateFunc,
} from "../../API/availableDate";
import "./AvailableDate.css";
import { getDoctors } from "../../API/doctor";

//------------------------------Use State-----------------------------

function AvailableDate() {
  const [availableDates, setAvailableDates] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [reload, setReload] = useState(true);
  const [alert, setAlert] = useState(false);

  const [newAvailableDate, setNewAvailableDate] = useState({
    availableDate: "",
    doctor: "",
  });

  const [updateAvailableDate, setUpdateAvailableDate] = useState({
    availableDate: "",
    doctor: "",
  });

    //------------------------------Use Effect-----------------------------
  useEffect(() => {
    getAvailableDates().then((data) => {
      setAvailableDates(data);
      setSearchResults(data);
      console.log(data);
    });
    getDoctors().then((data) => {
      setDoctors(data);
      console.log(data);
    });
    setReload(false);
  }, [reload]);

  //------------------------------New Available Date-----------------------------

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
    createAvailableDate(newAvailableDate)
    .then(() => {
      console.log(newAvailableDate);
      setReload(true);
      setNewAvailableDate({
        availableDate: "",
        doctor: {
          id: "",
        },
      })
    })
   
    .catch((error) => {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    });
  };

  //------------------------------Delete Available Date-----------------------------

  const handleDelete = (id) => {
    deleteAvailableDate(id).then(() => {
      setReload(true);
    });
  };

  //------------------------------Update Available Date-----------------------------

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
      doctor: {
        id: "",
      },
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

    //------------------------------Search Availablel Date-----------------------------
    const handleSearch = () => {
      const filteredAvailableDate = searchResults.filter((availableDate) =>
      availableDate.availableDate.toLowerCase().includes(search.toLowerCase())
      );
      setAvailableDates(filteredAvailableDate);
      setSearch("");
    };


  return (
    <>
    {/*--------------------------New AvailableDate Input Button------------------------ */}
    <h1 className="available-date-h1">Musait Gun Yonetimi </h1>
      <div className="availabledate-buttons">
        
      <div className="availabledate-newawailabledate">
   
        <h3 className="available-h3">Musait Gun Ekle</h3>
        <input
          type="date"
          placeholder="Musait Gun"
          name="availableDate"
          value={newAvailableDate.availableDate}
          onChange={handleNewAvailableDate}
        />

        <select
          value={newAvailableDate.doctor.id}
          name="doctor"
          onChange={handleNewAvailableDate}
        >
          <option value="" disabled={true} selected={true}>
            doktor seciniz
          </option>
          {doctors.map((doctor) => {
            return <option value={doctor.id}>{doctor.name}</option>;
          })}
        </select>

        <button onClick={handleNewAvailableDateBtn}>Create</button>
        {alert && (
          <Alert severity="error">
            The date is not available!
          </Alert>
        )}
      </div>

       {/*--------------------------Update AvailableDate Input Button------------------------ */}
      <div className="availabledate-updateavailabledate">
        <h3 className="available-h3">Musait Gun Güncelle</h3>

        

        <select value={updateAvailableDate.doctor.id} name="doctor" onChange={handleUpdateAvailableDateInputs}>
          <option value="" disabled={true} selected={true}>
            doctor seciniz
          </option>
          {doctors.map((doctor) => {
            return <option value={doctor.id}>{doctor.name}</option>;
          })}
        </select>

        <input
          type="date"
          placeholder="Musait Gun"
          name="availableDate"
          value={updateAvailableDate.availableDate}
          onChange={handleUpdateAvailableDateInputs}
        />

        <button onClick={handleUpdateAvailableDateBtn}>Update</button>
      </div>

      {/* ---------------------------Search AvailableDate Input Button------------------------ */}
      <div className="search-bar">
      <h3 className="available-h3">Musait Gun Ara</h3>

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
          placeholder="gun giriniz... "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      </div>

      {/* ------------------------------------------------------ */}
      <div className="list">
        <h3>Musait Gun Listesi</h3>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Ad Soyadi</th>
                <th>Musait Gun</th>
                <th>Telefon</th>
                <th>Mail</th>
                <th>Islemler</th>
              </tr>
            </thead>
            <tbody>
              {availableDates.map((availableDate) => (
                <tr key={availableDate.id}>
                  <td>{availableDate.doctor.name}</td>
                  <td>{availableDate.availableDate}</td>
                  <td>{availableDate.doctor.phone}</td>
                  <td>{availableDate.doctor.mail}</td>

                  <td>
                    <span onClick={() => handleUpdateIcon(availableDate)}>
                      <UpdateIcon />
                    </span>
                    <span onClick={() => handleDelete(availableDate.id)}>
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

export default AvailableDate;













































{
  /* 
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
           
          </div>
        ))} */
}

{
  /* </div>
    </>
  );
}

export default AvailableDate; */
}
