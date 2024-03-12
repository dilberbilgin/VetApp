import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";

import {
  getReports,
  deleteReport,
  createReport,
  updateReportFunc,
} from "../../API/report";
import "./Report.css";
import { getAppointments } from "../../API/appointment";

function Report() {
  const [reports, setReports] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [reload, setReload] = useState(true);

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

  useEffect(() => {
    getReports().then((data) => {
      setReports(data);
      console.log(data);
    });
    getAppointments().then((data) => {
      setAppointments(data);
      
    });
    setReload(false);
  }, [reload]);

  //New Report

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
    });
    setNewReport({
      title: "",
      diagnosis: "",
      price: "",
      appointment: "",
    });
  };

  //Delete Report

  const handleDelete = (id) => {
    deleteReport(id).then(() => {
      setReload(true);
    });
  };

  //Update Report

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
    });
    setUpdateReport({
      title: "",
      diagnosis: "",
      price: "",
      appointment: "",
    });
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

 

  return (
    <>

    <h1>Rapor Yonetimi</h1>
      <div className="report-newreport">
        <h2>Rapor Ekleme</h2>
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

        <select name="appointment" onChange={handleNewReport}>
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
      </div>

      {/* ------------------------------------------------------ */}
      <div className="report-updatereport">
        <h2>Rapor Güncelleme</h2>

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
      </div>

      {/* ------------------------------------------------------ */}
      <div className="list">
        <h2>Rapor Listesi</h2>
        {reports.map((report) => (
          <div key={report.id}>
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
            {report.vaccineList?.map((vaccineLists) => (
              <div key={vaccineLists.name}>
                {vaccineLists.name}
                </div>

            ))}
          </div> 
        ))}
      </div>
    </>
  );
}

export default Report;
