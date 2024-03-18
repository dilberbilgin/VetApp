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
  getAnimalByName,
} from "../../API/animal";
import "./Animal.css";
import { getCustomers } from "../../API/customer";
import { getAnimalByCustomerName } from "../../API/animal";

//------------------------------Use State-----------------------------

function Animal() {
  const [animals, setAnimals] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([]);
  const [reload, setReload] = useState(true);
  const [alert, setAlert] = useState(0);
  const [customerSearch, setCustomerSearch] = useState("");

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
    id: "",
  });

  //------------------------------Use Effect-----------------------------
  useEffect(() => {
    getAnimals().then((data) => {
      setAnimals(data);
      setSearchResults(data);
    });
    getCustomers().then((data) => {
      setCustomers(data);
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
  };

  const handleNewAnimalBtn = () => {
    createAnimal(newAnimal)
      .then(() => {
        setReload(true);
        setNewAnimal({
          name: "",
          species: "",
          breed: "",
          gender: "",
          colour: "",
          dateOfBirth: "",
          customer: {
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
          id: "",
        });
      })
      .catch((error) => {
        setAlert(2);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

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
  const handleSearchAnimalByName = () => {
    getAnimalByName(search).then((data) => {
      setAnimals(data);
    });
  };

  // const handleSearchAnimalByCustomerName = () => {
  //   const filteredAnimal = searchResults.filter((animal) =>
  //     animal.customer.name.toLowerCase().includes(search.toLowerCase())
  //   );
  //   setAnimals(filteredAnimal);
  // };

  const handleSearchAnimalByCustomerName = () => {
    getAnimalByCustomerName(customerSearch).then((data) => {
      setAnimals(data);
      console.log(data);
    });
  };
  const handleReset = () => {
    setSearch("");
    setCustomerSearch("");
    setAnimals(searchResults);
  };

  return (
    <div className="container">
      {/*--------------------------New Animal Input Button------------------------ */}
      <div className="animal-newanimal">
        <h1>Animal Management</h1>
        <h3>Add Animal</h3>
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

        <select
          value={newAvailableAnimal.customer.id}
          name="customer"
          onChange={handleNewAnimal}
        >
          <option value="" disabled={true} selected={true}>
            Select customer
          </option>
          {customers.map((customer) => {
            return <option value={customer.id}>{customer.name}</option>;
          })}
        </select>

        <button onClick={handleNewAnimalBtn}>Create</button>
        {alert === 1 ? (
          <Alert severity="error">
            Please review the information and try again!
          </Alert>
        ) : null}
      </div>

      {/*--------------------------Update Animal Input Button------------------------ */}
      <div className="animal-updateanimal">
        <h3>Update Animal</h3>

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
          type="date"
          placeholder="dateOfBirth"
          name="dateOfBirth"
          value={updateAnimal.dateOfBirth}
          onChange={handleUpdateAnimalInputs}
        />
        <select value={updateAnimal.customer.id}name="customer" onChange={handleUpdateAnimalInputs}>
          <option value="" disabled={true} selected={true}>
            Select Customer
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
          <h3>Search Animal</h3>
          <input
            type="text"
            placeholder="Enter animal name... "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={handleSearchAnimalByName}>Search</button>
        </div>

        <div className="search-bar">
          <h3>Search Customer</h3>
          <input
            type="text"
            placeholder="Enter customer name... "
            value={customerSearch}
            onChange={(e) => setCustomerSearch(e.target.value)}
          />
          <button onClick={handleSearchAnimalByCustomerName}>Search</button>
        </div>
        <div className="search-bar-reset">
          <button className="show-all" onClick={handleReset}>
            Show All
          </button>
        </div>
      </div>

      {/* ------------------------------List Animal ----------------------------- */}
      <div className="list">
        <h3>Animal List</h3>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Species</th>
                <th>Breed</th>
                <th>Gender</th>
                <th>Colour</th>
                <th>Date of Birth</th>
                <th>Customer Name</th>
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
    </div>
  );
}

export default Animal;
