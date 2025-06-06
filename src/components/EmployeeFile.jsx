import React, { useEffect, useState } from "react";
import { data } from "./EmployeeData";

// EmployeeFile component to handle CRUD operations for employee data
const EmployeeFile = () => {
  const [employee, setEmployee] = useState([]);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [address, setAddress] = useState("");
  const [update, setUpdate] = useState(false);

  // useEffect to initialize employee data from imported data
  useEffect(() => {
    setEmployee(data);
  }, []);

  // Handlers for various operations: edit, delete, save, update, and clear
  const handelEdit = (id) => {
    const dt = data.filter((emp) => emp.id === id);
    if (dt !== undefined) {
      setUpdate(true);
      setId(dt[0].id);
      setName(dt[0].name);
      setAge(dt[0].age);
      setAddress(dt[0].address);
    }
  };
  const handelDelete = (id) => {
    if (id > 0) {
      // confirm box for delete employee
      if (window.confirm("are you sure this employee want to delete?")) {
        const newEmployee = employee.filter((emp) => emp.id !== id);
        setEmployee(newEmployee);
        alert("employee deleted successfully");
      }
    }
  };
  // Save new employee data
  const handelSave = () => {
    if (name === "" || age === 0 || address === "") {
      alert("Please fill all the fields before saving.");
      return;
    }
    // Check if an employee with the same name already exists
    const existingEmployee = employee.find((emp) => emp.name === name);
    if (existingEmployee) {
      alert("Employee with this name already exists.");
      return;
    }
    const newEmployee = {
      id: employee.length + 1,
      name: name,
      age: age,
      address: address,
    };
    setEmployee([...employee, newEmployee]);
    setId(0);
    setName("");
    setAge(0);
    setAddress("");
    alert("employee saved successfully");
  };

  const handelUpdate = () => {
    const updatedEmployee = employee.map((emp) => {
      if (emp.id === id) {
        return { ...emp, name: name, age: age, address: address };
      }
      return emp;
    });
    setEmployee(updatedEmployee);
    setUpdate(false);
    setId(0);
    setName("");
    setAge(0);
    setAddress("");
    alert("employee updated successfully");
  };

  const handelClear = () => {
    setId(0);
    setName("");
    setAge(0);
    setAddress("");
    setUpdate(false);
    alert("form cleared successfully");
  };

  return (
    <>
      <div className="container mt-5">
        <div className="App">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            <div>
              <label>
                First Name:
                <input
                  type="text"
                  placeholder="Enter your Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                ></input>
              </label>
            </div>
            <div>
              <label>
                Age:
                <input
                  type="text"
                  placeholder="Enter your Age"
                  onChange={(e) => setAge(e.target.value)}
                  value={age}
                ></input>
              </label>
            </div>
            <div>
              <label>
                Address:
                <input
                  type="text"
                  placeholder="Enter your Address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                ></input>
              </label>
            </div>
            <div>
              {!update ? (
                <button
                  onClick={(e) => handelSave(e)}
                  className="btn btn-primary"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handelUpdate()}
                  className="btn btn-primary"
                >
                  Update
                </button>
              )}
              <button
                onClick={(e) => handelClear(e)}
                className="btn btn-danger ms-2"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
        <table className="table table-striped border border-2">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>age</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee &&
              employee.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.age}</td>
                  <td>{emp.address}</td>
                  <td>
                    <button
                      onClick={() => handelEdit(emp.id)}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handelDelete(emp.id)}
                      className="btn btn-danger ms-2 "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeFile;
