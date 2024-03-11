import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";

import {
  getCustomers,
  deleteCustomer,
  createCustomer,
  updateCustomerFunc,
} from "../../API/customer";
import "./Customer.css";

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [reload, setReload] = useState(true);

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

    //New Customer

  const handleNewCustomer = (event) => {
    setNewCustomer({
      ...newCustomer,
      [event.target.name]: event.target.value,
    });
    console.log(newCustomer);
  };

  const handleNewCustomerBtn = () => {
    console.log(newCustomer);
    createCustomer(newCustomer).then(() => {
      setReload(true);
    });
    setNewCustomer({
      name: "",
      phone: "",
      mail: "",
      address: "",
      city: "",
    });
  };

  console.log(customers)

  //Delete Customer

  const handleDelete = (id) => {
    deleteCustomer(id).then(() => {
      setReload(true);
    });
  };

  //Update Customer

  const handleUpdateCustomerInputs = (event) => {
    setUpdateCustomer({
      ...updateCustomer,
      [event.target.name]: event.target.value,
    });
  };


  const  handleUpdateCustomerBtn = () => {
    updateCustomerFunc(updateCustomer).then(() => {
      setReload(true);
    });
    setUpdateCustomer({
      name: "",
      phone: "",
      mail: "",
      address: "",
      city: "",
    });
  };

  const handleUpdateIcon = (customer) => {
    console.log(customer);
    setUpdateCustomer(customer);
  };

  useEffect(() => {
    getCustomers().then((data) => {
      setCustomers(data);
    });
    setReload(false);
  }, [reload]);

  return (
    <>
      <div className="customer-newccustomer">
        <h2>New Customer</h2>
        <input
          type="text"
          placeholder="Adi"
          name="name"
          value={newCustomer.name}
          onChange={handleNewCustomer}
        />
        <input
          type="text"
          placeholder="Telefon"
          name="phone"
          value={newCustomer.phone}
          onChange={handleNewCustomer}
        />

        <input
          type="text"
          placeholder="E-mail"
          name="mail"
          value={newCustomer.mail}
          onChange={handleNewCustomer}
        />

        <input
          type="text"
          placeholder="Adres"
          name="address"
          value={newCustomer.address}
          onChange={handleNewCustomer}
        />

        <input
          type="text"
          placeholder="Sehir"
          name="city"
          value={newCustomer.city}
          onChange={handleNewCustomer}
        />

        <button onClick={handleNewCustomerBtn}>Create</button>
      </div>

      {/* ------------------------------------------------------ */}

      <div className="customer-updatecustomer">
        <h2>Customer Guncelle</h2>

        <input
          type="text"
          placeholder="Adi"
          name="name"
          value={updateCustomer.name}
          onChange={handleUpdateCustomerInputs}
        />
        <input
          type="text"
          placeholder="Telefon"
          name="phone"
          value={updateCustomer.phone}
          onChange={handleUpdateCustomerInputs}
        />
        <input
          type="text"
          placeholder="E-mail"
          name="mail"
          value={updateCustomer.mail}
          onChange={handleUpdateCustomerInputs}
        />

        <input
          type="text"
          placeholder="Adres"
          name="address"
          value={updateCustomer.address}
          onChange={handleUpdateCustomerInputs}
        />

        <input
          type="text"
          placeholder="Sehir"
          name="city"
          value={updateCustomer.city}
          onChange={handleUpdateCustomerInputs}
        />

        <button onClick={handleUpdateCustomerBtn}>Update</button>
      </div>

      {/* ------------------------------------------------------ */}

      <div className="list">
        <h2>Customer Listesi</h2>
        {customers.map((customer) => (
          <div key={customer.id}>
            <h3>
              {customer.name} {customer.id}
              <span id={customer.id} onClick={() => handleDelete(customer.id)}>
                <DeleteIcon />
              </span>{" "}
              <span onClick={() => handleUpdateIcon(customer)}>
                {" "}
                <UpdateIcon />{" "}
              </span>
            </h3>{" "}
            {customer.address}
          </div>
        ))}
      </div>
    </>
  );
}

export default Customer;
