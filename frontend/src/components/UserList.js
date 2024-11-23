import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate()
  const userRole = localStorage.getItem("role");
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    role: "",
    emailAddress: "",
    departmentName: "",
    password: "0000"
  });
  const [showAddForm, setShowAddForm] = useState(false);
  
  

  useEffect(() => {
    axios.get("http://localhost:8080/company/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));

    axios.get("http://localhost:8080/company/departments")
      .then((response) => setDepartments(response.data))
      .catch((error) => console.error(error));
  }, []);

  const deleteUser = (id) => {

    if(userRole === "Admin" || userRole === "admin"){
      const confirm = window.confirm("Do you want to delete user?")
        if(confirm){
          axios.delete(`http://localhost:8080/company/users/${id}`)
          .then(() => setUsers(users.filter((user) => user.id !== id)))
          .catch((error) => console.error(error));
    }
    }else{
      alert("You do not have permission to delete users!")
    }

  };

  const handleEdit = (user) => {

    if(userRole === "Admin" || userRole === "admin"){
      setEditingUser(user.id);
      setEditedUser({...user});
    }else{
      alert("You do not have permission to edit users!")
    }

  };

  const handleCancel = () => {
    setEditingUser(null);
    setEditedUser({});
  }

  const handleSave = () => {

    const user = {
      ...editedUser,
      depId: {id: editedUser.depId},
    };

    axios.put(`http://localhost:8080/company/users/${editingUser}`, user)
         .then((response) => {
          setUsers((prev) => prev.map((user) => user.id === editingUser ? response.data : user));
    alert("Updated successfully!")
    setEditingUser(null);
    setEditedUser({});
  })
         .catch((error) => {
          console.error(error);
          alert("Failed to update!");
         })
  };

  const handleAdd = () => {
    
    if(!newUser.firstName || !newUser.lastName || !newUser.role || !newUser.emailAddress){
      alert("Fill out all required fields!")
      return;
    }

    const department = departments.find(
      (dept) => dept.id === parseInt(newUser.departmentName)
    );

    axios.post("http://localhost:8080/company/users", {
      ...newUser,
      depId: {id: newUser.departmentName},
    })
    .then((response) => {
      setUsers((prev) => [...prev, {...response.data, departmentName: department ? department.depName : "N/A",},]);
      setNewUser({
        firstName: "",
        lastName: "",
        role: "",
        emailAddress: "",
        departmentName: "",
      });
      setShowAddForm(false);  
    })
    .catch((error) => {
      alert("Failed to add user!")
    });
    
    
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    if(editingUser){
      setEditedUser((prev) => ({
        ...prev,
        [name]: value,
      }))
    }else{
      setNewUser((prev) =>({
        ...prev,
        [name]: value,
      }));
    }
  };


  return (
    <div>
      <h1>User List</h1>
      
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {editingUser === user.id ? (
                <>
                  <td>{user.id}</td>
                  <td>
                    <input
                      type="text"
                      name="firstName"
                      value={editedUser.firstName}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="lastName"
                      value={editedUser.lastName}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="role"
                      value={editedUser.role}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      name="emailAddress"
                      value={editedUser.emailAddress}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <select
                      name="depId"
                      value={editedUser.depId || ""}
                      onChange={(e) =>
                        setEditedUser((prev) => ({
                          ...prev,
                          depId: e.target.value,
                        }))
                      }
                      className="form-control"
                    >
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.depName}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-success" onClick={handleSave}>Save</button>
                    <button className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  {/* Default View */}
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.role}</td>
                  <td>{user.emailAddress}</td>
                  <td>{user.departmentName || "N/A"}</td>
                  <td>
                      <button style={{marginRight: 5}} className="btn btn-success" onClick={() => handleEdit(user)}>Edit</button>
                      <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
          {showAddForm && (
            <tr>
              <td>New</td>
              <td>
                <input
                  type="text"
                  name="firstName"
                  value={newUser.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  name="lastName"
                  value={newUser.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  name="role"
                  value={newUser.role}
                  onChange={handleInputChange}
                  placeholder="Role"
                />
              </td>
              <td>
                <input
                  type="email"
                  name="emailAddress"
                  value={newUser.emailAddress}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                />
              </td>
              <td>
              <select
                name="departmentName"
                value={newUser.departmentName}
                onChange={handleInputChange}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.depName}
                  </option>
                ))}
              </select>
              </td>
              <td>
                <button className="btn btn-success" onClick={handleAdd}>
                  Save
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {(userRole === "Admin" || userRole === "admin") &&(
        <button
        className="btn btn-primary mb-3"
        onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Cancel" : "Add User"}
        </button>
      )}
    </div>
  );
}

export default UserList;


