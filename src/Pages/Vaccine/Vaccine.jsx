
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
// import UpdateIcon from "@mui/icons-material/Update";
import UpdateIcon from "@mui/icons-material/Edit";

import {
  getVaccines,
  deleteVaccine,
  createVaccine,
  updateVaccineFunc,
} from "../../API/vaccine";
import "./Vaccine.css";
import { getAnimals } from "../../API/animal";
import { getReports } from "../../API/report";


function Vaccine() {
  const [vaccines, setVaccines] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [reports, setReports] = useState([]);
  const [reload, setReload] = useState(true);

  const [newVaccine, setNewVaccine] = useState({
    name: "",
    code: "",
    protectionStartDate: "",
    protectionFinishDate: "",
    animal: "",
    report: "",
  });

  const [updateVaccine, setUpdateVaccine] = useState({
    name: "",
    code: "",
    protectionStartDate: "",
    protectionFinishDate: "",
    animal: "",
    report: "",
  });

  //New Vaccine

  const handleNewVaccine = (event) => {
    if (event.target.name === "animal") {
      setNewVaccine({
        ...newVaccine,
        animal: {
          id: event.target.value,
        },
      });
     } else if (event.target.name === "report") {
      setNewVaccine({
          ...newVaccine,
          report: {
            id: event.target.value,
          },
        });
      } else {
      setNewVaccine({
        ...newVaccine,
        [event.target.name]: event.target.value,
      });
    }
    console.log(newVaccine);
  };

  const handleNewVaccineBtn = () => {
    createVaccine(newVaccine).then(() => {
      console.log(newVaccine);
      setReload(true);
    });
    setNewVaccine({
      name: "",
      code: "",
      protectionStartDate: "",
      protectionFinishDate: "",
      animal:{
        id: "",
      } ,
      report: {
        id: ""
      },
    });
  };

  //Delete Vaccine

  const handleDelete = (id) => {
    deleteVaccine(id).then(() => {
      setReload(true);
    });
  };

  //Update Vaccine

  const handleUpdateVaccineInputs = (event) => {
    if (event.target.name === "animal") {
      setUpdateVaccine({
        ...updateVaccine,
        animal: {
          id: event.target.value,
        },
      });
    } else if (event.target.name === "report") {
      setNewAppointment({
        ...newAppointment,
        report: {
          id: event.target.value,
        },
      });
    } else {
      setUpdateVaccine({
        ...updateVaccine,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdateVaccineBtn = () => {
    updateVaccineFunc(updateVaccine).then(() => {
      setReload(true);
    });
    setUpdateVaccine({
      name: "",
      code: "",
      protectionStartDate: "",
      protectionFinishDate: "",
      animal:{
        id: "",
      } ,
      report: {
        id: ""
      },
    });
  };

  // const handleUpdateIcon = (vaccine) => {
  //   console.log(vaccine);
  //   setUpdateVaccine(vaccine);
  // };

  const handleUpdateIcon = (vaccine) => {
    setUpdateVaccine({
      name: vaccine.name,
      code: vaccine.code,
      protectionStartDate: vaccine.protectionStartDate,
      protectionFinishDate: vaccine.protectionFinishDate,
      animal: vaccine.animal,
      report: vaccine.report,
      id: vaccine.id,
    });
  };

  useEffect(() => {
    getVaccines().then((data) => {
      setVaccines(data);
      console.log(data);
    });
    getAnimals().then((data) => {
      setAnimals(data);
      console.log(data);
    });
    getReports().then((data) => {
      setReports(data);
      console.log(data);
    });
    setReload(false);
  }, [reload]);

  return (
    <>
      <div className="vaccine-newvaccine">
        <h1>Asi Yonetimi</h1>
        <h3>Asi Gun Ekleme</h3>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newVaccine.name}
          onChange={handleNewVaccine}
        />
<input
          type="text"
          placeholder="Code"
          name="code"
          value={newVaccine.code}
          onChange={handleNewVaccine}
        />
         <input
          type="date"
          placeholder="Protection Start Date"
          name="protectionStartDate"
          value={newVaccine.protectionStartDate}
          onChange={handleNewVaccine}
        />
        <input
          type="date"
          placeholder="Protection Finish Date"
          name="protectionFinishDate"
          value={newVaccine.protectionFinishDate}
          onChange={handleNewVaccine}
        />
        
        <select value={newVaccine.animal.id} name="animal" onChange={handleNewVaccine}>
          <option value="" disabled={true} selected={true}>
            animal seciniz
          </option>
          {animals.map((animal) => {
            return <option value={animal.id}>{animal.name}</option>;
          })}
        </select>

        <select value={newVaccine.report.id} name="report" onChange={handleNewVaccine}>
          <option value="" disabled={true} selected={true}>
            report seciniz
          </option>
          {reports.map((report) => {
            return <option value={report.id}>{report.title}</option>;
          })}
        </select>

        <button onClick={handleNewVaccineBtn}>Create</button>
      </div>

      {/* ------------------------------------------------------ */}
      <div className="vaccine-updatevaccine">
        <h3>Asi Güncelleme</h3>

        <input
         type="text"
         placeholder="Name"
         name="name"
         value={updateVaccine.name}
         onChange={handleUpdateVaccineInputs}
        />

<input
         type="text"
         placeholder="Code"
         name="code"
         value={updateVaccine.code}
         onChange={handleUpdateVaccineInputs}
        />
       
       <input
         type="date"
         placeholder="Protection Start Date"
         name="protectionStartDate"
         value={updateVaccine.protectionStartDate}
         onChange={handleUpdateVaccineInputs}
        />

<input
         type="date"
         placeholder="Protection Finish Date"
         name="protectionFinishDate"
         value={updateVaccine.protectionFinishDate}
         onChange={handleUpdateVaccineInputs}
        />
        
        <select value={newVaccine.animal.id} name="animal" onChange={handleUpdateVaccineInputs}>
          <option value="" disabled={true} selected={true}>
            animal seciniz
          </option>
          {animals.map((animal) => {
            return <option value={animal.id}>{animal.name}</option>;
          })}
        </select>

        <select value={newVaccine.report.id} name="report" onChange={handleUpdateVaccineInputs}>
          <option value="" disabled={true} selected={true}>
            report seciniz
          </option>
          {reports.map((report) => {
            return <option value={report.id}>{report.title}</option>;
          })}
        </select>

        <button onClick={handleUpdateVaccineBtn}>Update</button>
      </div>

      {/* ------------------------------------------------------ */}
      <div className="list">
        <h3>Asi Gun Listesi</h3>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Asi</th>
                <th>Asi Kodu</th>
                <th>Koruma Baslangic Tarihi</th>
                <th>Koruma Bitis Tarihi</th>
                <th>Hayvan Adi</th>
                {/* <th>Rapor Basligi</th> */}
                <th>Islemler</th>
              </tr>
            </thead>
            <tbody>
              {vaccines.map((vaccine) => (
                <tr key={vaccine.id}>
                  <td>{vaccine.name}</td>
                  <td>{vaccine.code}</td>
                  <td>{vaccine.protectionStartDate}</td>
                  <td>{vaccine.protectionFinishDate}</td>
                  <td>{vaccine.animal.name}</td>
                  {/* <td>{vaccine.report.title}</td> */}

                  <td>
                    <span onClick={() => handleUpdateIcon(vaccine)}>
                      <UpdateIcon />
                    </span>
                    <span onClick={() => handleDelete(vaccine.id)}>
                      <DeleteIcon />
                    </span>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>



        {/* {vaccines.map((vaccine) => (
          <div key={vaccine.id}>
            <h3>
            {vaccine.id} - {vaccine.animal.name} / {vaccine.code}
              <span id={vaccine.id} onClick={() => handleDelete(vaccine.id)}>
                <DeleteIcon />
              </span>{" "}
              <span onClick={() => handleUpdateIcon(vaccine)}>
                {" "}
                <UpdateIcon />{" "}
              </span>
            </h3>{" "}
            {vaccine.protectionStartDate} /{vaccine.protectionFinishDate}
          </div>
        ))} */}




      </div>
    </>
  );
}

export default Vaccine;
