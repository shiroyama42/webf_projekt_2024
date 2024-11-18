import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/company/departments")
      .then((response) => setDepartments(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      firstName,
      lastName,
      role,
      emailAddress: email,
      depId: { id: departmentId }
    };

    axios.post("http://localhost:8080/company/users", user)
      .then(() => navigate("/"))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Add New User</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>First Name</label>
          <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div className="form-group mb-3">
          <label>Last Name</label>
          <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>
        <div className="form-group mb-3">
          <label>Role</label>
          <input type="text" className="form-control" value={role} onChange={(e) => setRole(e.target.value)} required />
        </div>
        <div className="form-group mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group mb-3">
          <label>Department</label>
          <select className="form-control" value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} required>
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.depName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-success">Save User</button>
      </form>
    </div>
  );
}

export default UserForm;
