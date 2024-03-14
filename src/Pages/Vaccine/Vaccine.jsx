
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
// import UpdateIcon from "@mui/icons-material/Update";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";

import {
  getVaccines,
  deleteVaccine,
  createVaccine,
  updateVaccineFunc,
} from "../../API/vaccine";
import "./Vaccine.css";
import { getAnimals } from "../../API/animal";
import { getReports } from "../../API/report";
import { getVaccinesByDate } from "../../API/vaccine";

//------------------------------Use State-----------------------------
function Vaccine() {
  const [vaccines, setVaccines] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [nameSearch, setNameSearch] = useState("");
  const [animalSearch, setAnimalSearch] = useState("");
  const [animals, setAnimals] = useState([]);
  const [reports, setReports] = useState([]);
  const [reload, setReload] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [alert, setAlert] = useState(0);

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


    //------------------------------Use Effect-----------------------------
    useEffect(() => {
      getVaccines().then((data) => {
        setVaccines(data);
        setSearchResults(data);
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
  

  //------------------------------New Vaccine-----------------------------

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
    }).catch((error) => {
      setAlert(1);
      setTimeout(() => {
        setAlert(0) // asinin koruyuculugu bitmemis ise alert!
      }, 3000);
    });
    
  };

  //------------------------------Delete Vaccine-----------------------------

  const handleDelete = (id) => {
    deleteVaccine(id).then(() => {
      setReload(true);
    });
  };

  //------------------------------Update Vaccine-----------------------------

  const handleUpdateVaccineInputs = (event) => {
    if (event.target.name === "animal") {
      setUpdateVaccine({
        ...updateVaccine,
        animal: {
          id: event.target.value,
        },
      });
    } else if (event.target.name === "report") {
      setUpdateVaccine({
        ...updateVaccine,
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
    
    }).catch((error) => {
      setAlert(2);
      setTimeout(() => {
        setAlert(0); // ayni isim ve code ise guncellemez, alert!
      }, 3000);
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

    //------------------------------Search Vaccine-----------------------------
    const handleSearchByVaccineName = () => {
      const filteredVaccine = searchResults.filter((vaccine) =>
      vaccine.name.toLowerCase().includes(nameSearch.toLowerCase())
      );
      setVaccines(filteredVaccine);
      
    };

    const handleSearchByAnimal = () => {
      const filteredVaccine = searchResults.filter((vaccine) =>
      vaccine.animal.name.toLowerCase().includes(animalSearch.toLowerCase())
      );
      setVaccines(filteredVaccine);
    };

    const handleSearchByDates = () => {
      getVaccinesByDate(startDate, endDate).then((data) => {
        setVaccines(data);
      });
    };

    const handleReset = () => {
      setStartDate("");
      setEndDate("");
      setNameSearch("");
      setAnimalSearch("");
      setVaccines(searchResults);
    };

    


  
  return (
    <>
        {/*--------------------------New Vaccine Input Button------------------------ */}
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
        {alert === 1 ? (
          <Alert severity="error">
            The vaccine protection is still active, you cannot add a new vaccine.
          </Alert>
        ):null}
      </div>

        {/*--------------------------Update Vaccine Input Button------------------------ */}
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
        
        <select value={updateVaccine.animal.id} name="animal" onChange={handleUpdateVaccineInputs}>
          <option value="" disabled={true} selected={true}>
            animal seciniz
          </option>
          {animals.map((animal) => {
            return <option value={animal.id}>{animal.name}</option>;
          })}
        </select>

        <select value={updateVaccine?.report?.id ? updateVaccine.report.id : ""} name="report" onChange={handleUpdateVaccineInputs}>
          <option value="" disabled={true} selected={true}>
            report seciniz
          </option>
          {reports.map((report) => {
            return <option value={report.id}>{report.title}</option>;
          })}
        </select>

        <button onClick={handleUpdateVaccineBtn}>Update</button>
        {alert === 2 ? (
          <Alert severity="error">
            "Another vaccine with the same name and code already exists in the system!"
          </Alert>
        ):null}
      </div>

       {/* ---------------------------Search Vaccine Input Button------------------------ */}

       <div className="search-bar-vaccine">
       <div className="search-bar">
      <h3>Isme Gore Asi Ara</h3>

      <input
          type="text"
          placeholder="Asi adi giriniz... "
          value={nameSearch}
          onChange={(e) => setNameSearch(e.target.value)}
        />
        <button onClick={handleSearchByVaccineName}>Search</button>
      </div>


      <div className="search-bar">
      <h3>Hayvana Gore Asi Ara</h3>
      <input
          type="text"
          placeholder="Hayvan adi giriniz... "
          value={animalSearch}
          onChange={(e) => setAnimalSearch(e.target.value)}
        />
        <button onClick={handleSearchByAnimal}>Search</button>
      </div>


      <div className="search-bar">
        <h3>Tarih Aralığına Göre Asi Ara</h3>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleSearchByDates}>Search</button>
      </div>
      
       </div>
      
<div className="reset-field">
<button className="reset" onClick={handleReset}>Tum Listeyi Goster</button>
</div>
     
      

        {/* <button onClick={handleSearch}>Search</button>
      </div> */}

{/* <select value={search} name="vaccine" onChange={handleSearch}>
          <option value="" disabled={true} selected={true}>
            vaccine seciniz
          </option>
          {vaccines.map((vaccine) => {
            return <option value={vaccine.id}>{vaccine.name}</option>;
           
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
       */}


{/* ---------------------------List Vaccine------------------------ */}
      <div className="list">
        <h3>Asi Listesi</h3>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Asi</th>
                <th>Asi Kodu</th>
                <th>Koruma Baslangic Tarihi</th>
                <th>Koruma Bitis Tarihi</th>
                <th>Hayvan Adi</th>
                <th>Rapor Basligi</th>
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
                  <td>{vaccine.report?.title}</td>

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

        </div>
    </>
  );
}

export default Vaccine;



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





