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

// export const getAppointmentsBetweenDates = async (startDate, endDate) => {
//   const { data } = await axios.get (
//     `${import.meta.env.VITE_APP_BASE_URL}/api/v1/appointments/doctorId?startDate=${startDate}&endDate=${endDate}&doctorId=1`
//   );
//   return data;
// };



