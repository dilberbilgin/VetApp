import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
// import UpdateIcon from "@mui/icons-material/Update";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";


import {
  getReports,
  deleteReport,
  createReport,
  updateReportFunc,
} from "../../API/report";
import "./Report.css";
import { getAppointments } from "../../API/appointment";

//------------------------------Use State-----------------------------
function Report() {
  const [reports, setReports] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [reload, setReload] = useState(true);
  const [alert, setAlert] = useState(0);

  const [newReport, setNewReport] = useState({
    title: "",
    diagnosis: "",
    price: "",
    appointment: "",
  });

  const [updateReport, setUpdateReport] = useState({
    title: "",
    diagnosis: "",
    price: "",
    appointment: "",
  });

    //------------------------------Use Effect-----------------------------
  useEffect(() => {
    getReports().then((data) => {
      setReports(data);
      setSearchResults(data);
      console.log(data);
    });
    getAppointments().then((data) => {
      setAppointments(data);
      
    });
    setReload(false);
  }, [reload]);

  //------------------------------New Report-----------------------------

  const handleNewReport = (event) => {
    if (event.target.name === "appointment") {
      setNewReport({
        ...newReport,
        appointment: {
          id: event.target.value,
        },
      });
    } else {
      setNewReport({
        ...newReport,
        [event.target.name]: event.target.value,
      });
    }
    console.log(newReport);
  };

  const handleNewReportBtn = () => {
    createReport(newReport).then(() => {
      console.log(newReport);
      setReload(true);
      setNewReport({
        title: "",
        diagnosis: "",
        price: "",
        appointment: {
          id:"",
        },
      });
    }).catch((error) => {
      setAlert(1);
      setTimeout(() => {
        setAlert(0); //ayni randevuya ait rapor varsa alert!
      }, 3000);
    })
   
  };

  //------------------------------Delete Report-----------------------------

  const handleDelete = (id) => {
    deleteReport(id).then(() => {
      setReload(true);
    });
  };

  //------------------------------Update Appointment-----------------------------

  const handleUpdateReportInputs = (event) => {
    if (event.target.name === "appointment") {
      setUpdateReport({
        ...updateReport,
        appointment: {
          id: event.target.value,
        },
      });
    } else {
      setUpdateReport({
        ...updateReport,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdateReportBtn = () => {
    updateReportFunc(updateReport).then(() => {
      setReload(true);
      setUpdateReport({
        title: "",
        diagnosis: "",
        price: "",
        appointment: {
          id:"",
        },
    });
    
    }).catch((error) => {
      setAlert(2);
      setTimeout(() => {
        setAlert(0); 
      }, 3000);
    })
  };

  // const handleUpdateIcon = (vaccine) => {
  //   console.log(vaccine);
  //   setUpdateVaccine(vaccine);
  // };

  const handleUpdateIcon = (report) => {
    setUpdateReport({
      title: report.title,
      diagnosis: report.diagnosis,
      price: report.price,
      appointment: report.appointment,
      id: report.id,
    });
  };

      //------------------------------Search Report-----------------------------
      const handleSearch = () => {
        const filteredReport = searchResults.filter((report) =>
        report.title.toLowerCase().includes(search.toLowerCase())
        );
        setReports(filteredReport);
        setSearch("");
      };
  
 

  return (
    <>
    {/*--------------------------New Report Input Button------------------------ */}
    <h1>Rapor Yonetimi</h1>
      <div className="report-newreport">
        <h3>Rapor Ekleme</h3>
        <input
          type="text"
          placeholder="title"
          name="title"
          value={newReport.title}
          onChange={handleNewReport}
        />
        <input
          type="text"
          placeholder="diagnosis"
          name="diagnosis"
          value={newReport.diagnosis}
          onChange={handleNewReport}
        />
        <input
          type="number"
          placeholder="price"
          name="price"
          value={newReport.price}
          onChange={handleNewReport}
        />

        <select value={newReport.appointment.id} name="appointment" onChange={handleNewReport}>
          <option value="" disabled={true} selected={true}>
            randevu seciniz
          </option>
          {appointments.map((appointment) => {
            return (
              <option value={appointment.id}>
                {appointment.appointmentDate}
              </option>
            );
          })}
        </select>

        <button onClick={handleNewReportBtn}>Create</button>
        {alert === 1 ? (
          <Alert severity="error">
            This report with this appointment has already been registered in the system!
          </Alert>
        ):null}
      </div>

          {/*--------------------------Update Appointment Input Button------------------------ */}
      <div className="report-updatereport">
        <h3>Rapor Güncelleme</h3>

        <input
          type="text"
          placeholder="title"
          name="title"
          value={updateReport.title}
          onChange={handleUpdateReportInputs}
        />

        <input
          type="text"
          placeholder="diagnosis"
          name="diagnosis"
          value={updateReport.diagnosis}
          onChange={handleUpdateReportInputs}
        />

        <input
          type="number"
          placeholder="price"
          name="price"
          value={updateReport.price}
          onChange={handleUpdateReportInputs}
        />

        <select name="appointment" onChange={handleUpdateReportInputs}>
          <option value="" disabled={true} selected={true}>
            randevu seciniz
          </option>
          {appointments.map((appointment) => {
            return <option value={appointment.id}>{appointment.appointmentDate}</option>;
          })}
        </select>

        <button onClick={handleUpdateReportBtn}>Update</button>
        {alert === 2 ? (
          <Alert severity="error">
            This report has already been registered in the system!
          </Alert>
        ):null}

      </div>

      {/* ---------------------------Search Report Input Button------------------------ */}

      <div className="search-bar">
      <h3>Rapor Ara</h3>

      <input
          type="text"
          placeholder="isim giriniz... "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
      </div>

   

    
          {/* ---------------------------List Report------------------------ */}
      <div className="list">
        <h3>Rapor Listesi</h3>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Rapor Basligi</th>
                <th>Hayvan Adi</th>
                <th>Tani</th>
                <th>Doktor Adi</th>
                <th>Musteri</th>
                <th>Asi Listesi</th>
                <th>Fiyat</th>
                <th>Islemler</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.title}</td>
                  <td>{report.appointment.animal.name}</td>
                  <td>{report.diagnosis}</td>
                  <td>{report.appointment.doctor.name}</td>
                  <td>{report.appointment.animal.customer.name}</td>
                   <td >{report.vaccineList?.map((vaccineLists) => (
<span>{vaccineLists.name} , </span>       
             
            ))}</td>
                   
                  
                  <td>{report.price}</td>
              
                  <td>
                    <span onClick={() => handleUpdateIcon(report)}>
                      <UpdateIcon />
                    </span>
                    <span onClick={() => handleDelete(report.id)}>
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

export default Report;


        {/* {reports.map((report) => (
          <div className="reports" key={report.id}>
            <h3>
              {report.id} - {report.title} - {report.doctorName}
              <span id={report.id} onClick={() => handleDelete(report.id)}>
                <DeleteIcon />
              </span>{" "}
              <span onClick={() => handleUpdateIcon(report)}>
                {" "}
                <UpdateIcon />{" "}
              </span>
            </h3>{" "}
            {report.animalName} - {report.diagnosis} 
            Asi Listesi : {report.vaccineList?.map((vaccineLists) => (
              <div key={vaccineLists.name}>
                {vaccineLists.name}
                </div>
            ))}
          </div> 
        ))} */}





      {/* </div>
    </>
  );
}

export default Report; */}
