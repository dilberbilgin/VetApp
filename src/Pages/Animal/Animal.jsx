import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";

import {
  getAnimals,
  deleteAnimal,
  createAnimal,
  updateAnimalFunc,
} from "../../API/animal";
import "./Animal.css";
import { getCustomers } from "../../API/customer";

function Animal() {
  const [animals, setAnimals] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [reload, setReload] = useState(true);

  const [newAnimal, setNewAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    colour: "",
    dateOfBirth: "",
    customer: "",
  });

  const [updateAnimal, setUpdateAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    colour: "",
    dateOfBirth: "",
    customer: "",
  });

  //New Animal

  const handleNewAnimal = (event) => {
    if (event.target.name === "customer") {
      setNewAnimal({
        ...newAnimal,
        customer: {
          id: event.target.value,
        },
      });
    } else {
      setNewAnimal({
        ...newAnimal,
        [event.target.name]: event.target.value,
      });
      
    }
    console.log(newAnimal);
  };

  const handleNewAnimalBtn = () => {
    createAnimal(newAnimal).then(() => {
      console.log(newAnimal);
      setReload(true);
    });
    setNewAnimal({
      name: "",
      species: "",
      breed: "",
      gender: "",
      colour: "",
      dateOfBirth: "",
      customer: "",
    });
  };

  //Delete Animal

  const handleDelete = (id) => {
    deleteAnimal(id).then(() => {
      setReload(true);
    });
  };

  //Update Animal

  const handleUpdateAnimalInputs = (event) => {
    if (event.target.name === "customer"){
      setUpdateAnimal({
        ...updateAnimal,
        customer: {
          id: event.target.value,
        },
      });

    } else {
      setUpdateAnimal({
        ...updateAnimal,
        [event.target.name]: event.target.value,
      });
    }
    
  };

  const handleUpdateAnimalBtn = () => {
    updateAnimalFunc(updateAnimal).then(() => {
      setReload(true);
    });
    setUpdateAnimal({
      name: "",
      species: "",
      breed: "",
      gender: "",
      colour: "",
      dateOfBirth: "", // BU KISIMLAR KONTROL !!
      customer: "", // BU KISIMLAR KONTROL !!
    });
  };

  // const handleUpdateIcon = (animal) => {
  //   console.log(animal);
  //   setUpdateDoctor(animal);
  // };

  const handleUpdateIcon = (animal) => {
    setUpdateAnimal({
      name: animal.name,
      species: animal.species,
      breed: animal.breed,
      gender: animal.gender,
      colour: animal.colour,
      dateOfBirth: animal.dateOfBirth,
      customer: animal.customer,
      id: animal.id,
    });
  };

  useEffect(() => {
    getAnimals().then((data) => {
      setAnimals(data);
      console.log(data);
    });
    getCustomers().then((data) => {
      setCustomers(data);
      console.log(data);
    });
    setReload(false);
  }, [reload]);

  return (
    <>
      <div className="animal-newanimal">
        <h2>Hayvan Ekleme</h2>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newAnimal.name}
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          placeholder="Species"
          name="species"
          value={newAnimal.species}
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          placeholder="Breed"
          name="breed"
          value={newAnimal.breed}
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          placeholder="Gender"
          name="gender"
          value={newAnimal.gender}
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          placeholder="Colour"
          name="colour"
          value={newAnimal.colour}
          onChange={handleNewAnimal}
        />
        <input
          type="date"
          placeholder="dateOfBirth"
          name="dateOfBirth"
          value={newAnimal.dateOfBirth}
          onChange={handleNewAnimal}
        />

        <select name="customer" onChange={handleNewAnimal}>
          <option value="" disabled={true} selected={true} >
            customer seciniz
          </option>
          {customers.map((customer) => {
            return <option value={customer.id}>{customer.name}</option>;
          })}
        </select>

        <button onClick={handleNewAnimalBtn}>Create</button>
      </div>

      {/* ------------------------------------------------------ */}
      <div className="animal-updateanimal">
        <h2>Hayvan Güncelleme</h2>

        <input
          type="text"
          placeholder="Name"
          name="name"
          value={updateAnimal.name}
          onChange={handleUpdateAnimalInputs}
        />
        <input
          type="text"
          placeholder="Species"
          name="species"
          value={updateAnimal.species}
          onChange={handleUpdateAnimalInputs}
        />
        <input
          type="text"
          placeholder="Breed"
          name="breed"
          value={updateAnimal.breed}
          onChange={handleUpdateAnimalInputs}
        />
        <input
          type="text"
          placeholder="Gender"
          name="gender"
          value={updateAnimal.gender}
          onChange={handleUpdateAnimalInputs}
        />
        <input
          type="text"
          placeholder="Colour"
          name="colour"
          value={updateAnimal.colour}
          onChange={handleUpdateAnimalInputs}
        />
        <input
          type="text"
          placeholder="dateOfBirth"
          name="dateOfBirth"
          value={updateAnimal.dateOfBirth}
          onChange={handleUpdateAnimalInputs}
        />
       <select name="customer" onChange={handleUpdateAnimalInputs}>
          <option value="" disabled={true} selected={true} >
            customer seciniz
          </option>
          {customers.map((customer) => {
            return <option value={customer.id}>{customer.name}</option>;
          })}
        </select>

        <button onClick={handleUpdateAnimalBtn}>Update</button>
      </div>

      {/* ------------------------------------------------------ */}
      <div className="list">
        <h2>Hayvan Listesi</h2>
        {animals.map((animal) => (
          <div key={animal.id}>
            <h3>
              {animal.name} {animal.id}
              <span id={animal.id} onClick={() => handleDelete(animal.id)}>
                <DeleteIcon />
              </span>{" "}
              <span onClick={() => handleUpdateIcon(animal)}>
                {" "}
                <UpdateIcon />{" "}
              </span>
            </h3>{" "}
            {animal.breed}
          </div>
        ))}
      </div>
    </>
  );
}

export default Animal;
