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
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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
        setReload(true);
        setNewAvailableDate({
          availableDate: "",
          doctor: {
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
    updateAvailableDateFunc(updateAvailableDate)
      .then(() => {
        setReload(true);
        setUpdateAvailableDate({
          availableDate: "",
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

  const handleUpdateIcon = (availableDate) => {
    setUpdateAvailableDate({
      availableDate: availableDate.availableDate,
      doctor: availableDate.doctor,
      id: availableDate.id,
    });
  };

  //------------------------------Search Availablel Date-----------------------------

  const handleInputSelect = (event) => {
    setSearch(event.target.value);
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

  const handleSearch = () => {
    const filteredAvailableDate = searchResults.filter((availableDate) =>
      availableDate.availableDate.toLowerCase().includes(search.toLowerCase())
    );
    setAvailableDates(filteredAvailableDate);
    setSearch("");
  };

  const handleReset = () => {
    setSearch("");
    setAvailableDates(searchResults);
  };

  // const handleReset = () => {
  //   setSearch("");
  //   setAvailableDates(searchResults);
  //   getAvailableDates().then((data) => {
  //     setAvailableDates(data);
  //   })
  // };

  return (
    <>
      {/*--------------------------New AvailableDate Input Button------------------------ */}
      <h1 className="available-date-h1">Available Date Management </h1>
      <div className="availabledate-buttons">
        <div className="availabledate-newawailabledate">
          <h3 className="available-h3">Add Available Date</h3>

          <select
            value={newAvailableDate.doctor.id}
            name="doctor"
            onChange={handleNewAvailableDate}
          >
            <option value="" disabled={true} selected={true}>
              Select doctor
            </option>
            {doctors.map((doctor) => {
              return <option value={doctor.id}>{doctor.name}</option>;
            })}
          </select>
          <input
            type="date"
            placeholder="Available Date"
            name="availableDate"
            value={newAvailableDate.availableDate}
            onChange={handleNewAvailableDate}
          />

          <button onClick={handleNewAvailableDateBtn}>Create</button>
          {alert === 1 ? (
            <Alert severity="error">This date is not available!</Alert>
          ) : null}
        </div>

        {/*--------------------------Update AvailableDate Input Button------------------------ */}
        <div className="availabledate-updateavailabledate">
          <h3 className="available-h3">Update Available Date</h3>

          <select
            value={updateAvailableDate.doctor.id}
            name="doctor"
            onChange={handleUpdateAvailableDateInputs}
          >
            <option value="" disabled={true} >
              Selected doctor
            </option>
            {doctors.map((doctor) => {
              return <option value={doctor.id}>{doctor.name}</option>;
            })}
          </select>

          <input
            type="date"
            placeholder="Available Date"
            name="availableDate"
            value={updateAvailableDate.availableDate}
            onChange={handleUpdateAvailableDateInputs}
          />

          <button onClick={handleUpdateAvailableDateBtn}>Update</button>
          {alert === 2 ? (
            <Alert severity="error">
              This date has already been registered in the system!
            </Alert>
          ) : null}
        </div>

        {/* ---------------------------Search AvailableDate Input Button------------------------ */}
        <div className="search-bar">
          <h3 className="available-h3">Search Available Date</h3>

          <select value={search} name="doctor" onChange={handleInputSelect}>
            <option value="" disabled={true} selected={true}>
              Select doctor
            </option>
            {doctors.map((doctor) => {
              return <option value={doctor.id}>{doctor.name}</option>;
            })}
          </select>

          <input
            type="date"
            placeholder="Enter date... "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          <button className="reset" onClick={handleReset}>
            Show All
          </button>

        </div>
      </div>

      {/* ------------------------------------------------------ */}
      <div className="list">
        <h3>Available Date List</h3>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name Surname</th>
                <th>Available Date</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
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
