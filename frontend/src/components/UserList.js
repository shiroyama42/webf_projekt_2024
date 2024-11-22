import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [departments, setDepartments] = useState([]);
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || null);
  const isAdmin = userRole.toLowerCase() === "admin";

  useEffect(() => {
    axios.get("http://localhost:8080/company/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));

    axios.get("http://localhost:8080/company/departments")
      .then((response) => setDepartments(response.data))
      .catch((error) => console.error(error));
  }, []);

  const deleteUser = (id) => {
    const confirm = window.confirm("Do you want to delete user?")
    if(confirm){
      axios.delete(`http://localhost:8080/company/users/${id}`)
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch((error) => console.error(error));
    }

  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditedUser({...user});
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
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }))
  };


  return (
    <div>
      <h1>User List</h1>
      {isAdmin &&<Link to="/add" className="btn btn-primary mb-3">Add User</Link>}
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
                  {/* Inline Edit Form */}
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
                    {isAdmin && (
                      <>
                        <button style={{marginRight: 5}} className="btn btn-success" onClick={() => handleEdit(user)}>Edit</button>
                        <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
                      </>)}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;


