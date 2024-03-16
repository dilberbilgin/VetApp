import axios from "axios";

export const getVaccines = async () => {
  const { data } = await
  axios.get (
    import.meta.env.VITE_APP_BASE_URL + "/api/v1/vaccines");
    console.log(data);
  return data;
};

export const deleteVaccine = async (id) => {
  const { data } = await axios.delete (
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccines/${id}`
  );
  return data;
};

export const createVaccine = async (vaccine) => {
  const { data } = await axios.post (
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccines`,
    vaccine
  );
  return data;
};

export const updateVaccineFunc = async (vaccine) => {
  const { data } = await axios.put(   `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccines/${vaccine.id}`,
  vaccine
  );
  return data;
};

export const getVaccineByName = async (name) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccines/byName?name=${name}`
  );
   
  return data;
};
//http://localhost:8080/api/v1/vaccines/byName?name=Kuduz


export const getVaccineByAnimalName = async (animalName) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccines/byAnimalName?animalName=${animalName}`
  );
  return data;
};
// http://localhost:8080/api/v1/animals/byCustomerName?customerName=Deniz Bilgin



export const getVaccinesByDate = async (startDate, endDate) => {

  const { data } = await
  axios.get (
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccines/finishDate?startDate=${startDate}&endDate=${endDate}`
    );
    console.log(data);
  return data;
};
//http://localhost:8080/api/v1/vaccines/finishDate?startDate=2023-11-08&endDate=2023-12-20



