import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
// import UpdateIcon from "@mui/icons-material/Update";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";

import {
  getAnimals,
  deleteAnimal,
  createAnimal,
  updateAnimalFunc,
} from "../../API/animal";
import "./Animal.css";
import { getCustomers } from "../../API/customer";

//------------------------------Use State-----------------------------

function Animal() {
  const [animals, setAnimals] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([]);
  const [reload, setReload] = useState(true);
  const [alert, setAlert] = useState(0);

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

  //------------------------------Use Effect-----------------------------
  useEffect(() => {
    getAnimals().then((data) => {
      setAnimals(data);
      setSearchResults(data);
    });
    getCustomers().then((data) => {
      setCustomers(data);
      console.log(data);
    });
    setReload(false);
  }, [reload]);

  //------------------------------New Animal-----------------------------

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
    createAnimal(newAnimal)
      .then(() => {
        console.log(newAnimal);
        setReload(true);
        setNewAnimal({
          name: "",
          species: "",
          breed: "",
          gender: "",
          colour: "",
          dateOfBirth: "",
          customer: "",
        });
      })
      .catch((error) => {
        setAlert(1);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  //------------------------------Delete Animal-----------------------------

  const handleDelete = (id) => {
    deleteAnimal(id).then(() => {
      setReload(true);
    });
  };

  //------------------------------Update Animal-----------------------------

  const handleUpdateAnimalInputs = (event) => {
    if (event.target.name === "customer") {
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
    updateAnimalFunc(updateAnimal)
      .then(() => {
        setReload(true);
        setUpdateAnimal({
          name: "",
          species: "",
          breed: "",
          gender: "",
          colour: "",
          dateOfBirth: "", 
          customer: "", 
        });
      })
      .catch((error) => {
        setAlert(2);
        setTimeout(() => {
          setAlert(0); 
        }, 3000);
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

  //------------------------------Search Animal-----------------------------
  const handleSearch = () => {
    const filteredAnimal = searchResults.filter((animal) =>
      animal.name.toLowerCase().includes(search.toLowerCase())
    );
    setAnimals(filteredAnimal);
  };

  const handleSearchAnimalByCustomerName = () => {
    const filteredAnimal = searchResults.filter((animal) =>
      animal.customer.name.toLowerCase().includes(search.toLowerCase())
    );
    setAnimals(filteredAnimal);
  };

  const handleReset = () => {
    setSearch("");
    setAnimals(searchResults);
  };

  return (
    <>
      {/*--------------------------New Animal Input Button------------------------ */}
      <div className="animal-newanimal">
        <h1>Hayvan Yonetimi</h1>
        <h3>Hayvan Ekleme</h3>
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
          <option value="" disabled={true} selected={true}>
            customer seciniz
          </option>
          {customers.map((customer) => {
            return <option value={customer.id}>{customer.name}</option>;
          })}
        </select>

        <button onClick={handleNewAnimalBtn}>Create</button>
        {alert === 1 ? (
          <Alert severity="error">
            This animal has already been registered in the system!
          </Alert>
        ) : null}
      </div>

      {/*--------------------------Update Animal Input Button------------------------ */}
      <div className="animal-updateanimal">
        <h3>Hayvan Güncelleme</h3>

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
          <option value="" disabled={true} selected={true}>
            customer seciniz
          </option>
          {customers.map((customer) => {
            return <option value={customer.id}>{customer.name}</option>;
          })}
        </select>

        <button onClick={handleUpdateAnimalBtn}>Update</button>
        {alert === 2 ? (
          <Alert severity="error">
            This animal has already been registered in the system!
          </Alert>
        ) : null}
      </div>

      {/*--------------------------Search Animal Input Button------------------------ */}

      <div className="search-bar-animal">
        <div className="search-bar">
          <h3>Hayvan Ara</h3>
          <input
            type="text"
            placeholder="isim giriniz... "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="search-bar">
          <h3>Hayvan Sahibi Ara</h3>
          <input
            type="text"
            placeholder="musteri ismi giriniz... "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearchAnimalByCustomerName}>Search</button>
        </div>

        <div className="reset-animal">
          <button className="reset" onClick={handleReset}>
            Tum Listeyi Goster
          </button>
        </div>
      </div>

      {/* ------------------------------List Animal ----------------------------- */}
      <div className="list">
        <h3>Hayvan Listesi</h3>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Adi</th>
                <th>Tur</th>
                <th>Irk</th>
                <th>Cinsiyet</th>
                <th>Renk</th>
                <th>Dogum Tarihi</th>
                <th>Sahibi</th>
                <th>Islemler</th>
              </tr>
            </thead>
            <tbody>
              {animals.map((animal) => (
                <tr key={animal.id}>
                  <td>{animal.name}</td>
                  <td>{animal.species}</td>
                  <td>{animal.breed}</td>
                  <td>{animal.gender}</td>
                  <td>{animal.colour}</td>
                  <td>{animal.dateOfBirth}</td>
                  <td>{animal.customer.name}</td>

                  <td>
                    <span onClick={() => handleUpdateIcon(animal)}>
                      <UpdateIcon />
                    </span>
                    <span onClick={() => handleDelete(animal.id)}>
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

export default Animal;

{
  /* {animals.map((animal) => (
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
        ))} */
}

{
  /* </div>
    </>
  );
}

export default Animal; */
}
