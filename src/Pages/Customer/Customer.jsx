import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
// import UpdateIcon from "@mui/icons-material/Update";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";

import {
  getCustomers,
  deleteCustomer,
  createCustomer,
  updateCustomerFunc,
  getCustomerByName,
} from "../../API/customer";
import "./Customer.css";

//------------------------------Use State-----------------------------

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [reload, setReload] = useState(true);
  const [alert, setAlert] = useState(0);
  const [customerSearch, setCustomerSearch] = useState("");

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    mail: "",
    address: "",
    city: "",
  });
  const [updateCustomer, setUpdateCustomer] = useState({
    name: "",
    phone: "",
    mail: "",
    address: "",
    city: "",
  });

  //------------------------------Use Effect-----------------------------
  useEffect(() => {
    getCustomers().then((data) => {
      setCustomers(data);
      setSearchResults(data);
    });
    setReload(false);
  }, [reload]);

  //------------------------------New Customer-----------------------------
  const handleNewCustomer = (event) => {
    setNewCustomer({
      ...newCustomer,
      [event.target.name]: event.target.value,
    });
    console.log(newCustomer);
  };

  const handleNewCustomerBtn = () => {
    console.log(newCustomer);
    createCustomer(newCustomer)
      .then(() => {
        setReload(true);
        setNewCustomer({
          name: "",
          phone: "",
          mail: "",
          address: "",
          city: "",
        });
      })
      .catch((error) => {
        setAlert(1);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  console.log(customers);

  //------------------------------Delete Customer-----------------------------
  const handleDelete = (id) => {
    deleteCustomer(id).then(() => {
      setReload(true);
    });
  };

  //------------------------------Update Customer-----------------------------
  const handleUpdateCustomerInputs = (event) => {
    setUpdateCustomer({
      ...updateCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateCustomerBtn = () => {
    updateCustomerFunc(updateCustomer)
      .then(() => {
        setReload(true);
        setUpdateCustomer({
          name: "",
          phone: "",
          mail: "",
          address: "",
          city: "",
        });
      })
      .catch((error) => {
        setAlert(2);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  const handleUpdateIcon = (customer) => {
    console.log(customer);
    setUpdateCustomer(customer);
  };

  //------------------------------Search Customer-----------------------------


  const handleSearchCustomerByName = () => {
    getCustomerByName(customerSearch).then((data) => {
      setCustomers(data);
    });
  };

  const handleReset = () => {
    setCustomerSearch("");
    setCustomers(searchResults);
  };

  // const handleReset = () => {
  //   setCustomerSearch("");
  //   setCustomers(searchResults);
  //   getCustomers().then((data) => {
  //     setCustomers(data);
  //   })
  // };

  return (
    <div className="container">
      {/*--------------------------New Customer Input Button------------------------ */}
      <div className="customer-newcustomer">
        <h1>Customer Management</h1>
        <h3>Add Customer</h3>

        <input
          type="text"
          placeholder="Name Surname"
          name="name"
          value={newCustomer.name}
          onChange={handleNewCustomer}
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={newCustomer.phone}
          onChange={handleNewCustomer}
        />

        <input
          type="text"
          placeholder="Email"
          name="mail"
          value={newCustomer.mail}
          onChange={handleNewCustomer}
        />

        <input
          type="text"
          placeholder="Address"
          name="address"
          value={newCustomer.address}
          onChange={handleNewCustomer}
        />

        <input
          type="text"
          placeholder="City"
          name="city"
          value={newCustomer.city}
          onChange={handleNewCustomer}
        />

        <button onClick={handleNewCustomerBtn}>Create</button>
        {alert === 1 ? (
          <Alert severity="error">
            Please review the information and try again!
          </Alert>
        ) : null}
      </div>

      {/* -------------------------Update Customer Input Button------------------------ */}
      <div className="customer-updatecustomer">
        <h3>Update Customer</h3>

        <input
          type="text"
          placeholder="Name"
          name="name"
          value={updateCustomer.name}
          onChange={handleUpdateCustomerInputs}
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={updateCustomer.phone}
          onChange={handleUpdateCustomerInputs}
        />
        <input
          type="text"
          placeholder="Email"
          name="mail"
          value={updateCustomer.mail}
          onChange={handleUpdateCustomerInputs}
        />
        <input
          type="text"
          placeholder="Address"
          name="address"
          value={updateCustomer.address}
          onChange={handleUpdateCustomerInputs}
        />
        <input
          type="text"
          placeholder="City"
          name="city"
          value={updateCustomer.city}
          onChange={handleUpdateCustomerInputs}
        />
        <button onClick={handleUpdateCustomerBtn}>Update</button>
        {alert === 2 ? (
          <Alert severity="error">
            Please select a customer!
          </Alert>
        ) : null}
      </div>

      {/* ---------------------------Search Customer Input Button------------------------ */}
      <div className="search-bar">
        <h3>Search Customer</h3>
        <input
          type="text"
          placeholder="Enter name..."
          value={customerSearch}
          onChange={(e) => setCustomerSearch(e.target.value)}
        />
        <button className="search-button" onClick={handleSearchCustomerByName}>
          Search
        </button>
        <button className="reset-button" onClick={handleReset}>
          Show All
        </button>
      </div>

      {/* ------------------------------List Customer ----------------------------- */}
      <div className="list">
        <h3>Customer List</h3>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name Surname</th>
                <th>Phone</th>
                <th>Address</th>
                <th>City</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>
                  <td>{customer.city}</td>
                  <td>{customer.mail}</td>
                  <td>
                    <span onClick={() => handleUpdateIcon(customer)}>
                      <UpdateIcon />
                    </span>
                    <span onClick={() => handleDelete(customer.id)}>
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
export default Customer;
