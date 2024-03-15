import axios from "axios";

export const getAppointments = async () => {
  const { data } = await
  axios.get (
    import.meta.env.VITE_APP_BASE_URL + "/api/v1/appointments");
    console.log(data);
  return data;
};

export const deleteAppointment = async (id) => {
  const { data } = await axios.delete (
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/appointments/${id}`
  );
  return data;
};

export const createAppointment = async (appointment) => {
  const { data } = await axios.post (
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/appointments`,
    appointment
  );
  return data;
};

export const updateAppointmentFunc = async (appointment) => {
  const { data } = await axios.put(   `${import.meta.env.VITE_APP_BASE_URL}/api/v1/appointments/${appointment.id}`,
  appointment
  );
  return data;
};

export const getAppointmentByDateDoctor = async (startDate, endDate, doctorId) => {
  const { data } = await axios.get (
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/appointments/doctorId?startDate=${startDate}&endDate=${endDate}&doctorId=${doctorId}`
  );
  return data;
};

export const getAppointmentByDateAnimal = async (startDate, endDate, animalId) => {
  const { data } = await axios.get (
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/appointments/animalId?startDate=${startDate}&endDate=${endDate}&animalId=${animalId}`
  );
  return data;
};


// http://localhost:8080/api/v1/appointments/doctorId?startDate=2023-12-06T14:00:00.336&endDate=2023-12-09T14:00:00.336&doctorId=1


//http://localhost:8080/api/v1/appointments/animalId?startDate=2023-12-06T14:00:00.336&endDate=2023-12-09T14:00:00.336&animalId=1