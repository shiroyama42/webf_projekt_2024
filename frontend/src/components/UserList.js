import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  const [departmentId, setDepartmentId] = useState([]);
  const [departments, setDepartments] = useState([]); // Stores department data
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    // Fetch users
    axios
      .get("http://localhost:8080/company/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));

    // Fetch departments
    axios
      .get("http://localhost:8080/company/departments")
      .then((response) => setDepartments(response.data))
      .catch((error) => console.error(error));
  }, []);

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:8080/company/users/${id}`)
        .then(() => {
          setUsers(users.filter((user) => user.id !== id));
          alert("User deleted successfully.");
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          alert("Failed to delete user. Please try again.");
        });
    }
  };

  const startEditing = (user) => {
    setEditingUserId(user.id);
    setEditedData({ ...user, depId: user.depId || "" }); // Correctly set depId
  };

  const cancelEditing = () => {
    setEditingUserId(null);
    setEditedData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveEdit = (id) => {

    axios
      .put(`http://localhost:8080/company/users/${id}`, {
        firstName: editedData.firstName,
        lastName: editedData.lastName,
        role: editedData.role,
        emailAddress: editedData.emailAddress,
        depId: editedData.depId ? { id: editedData.depId } : null, // Ensure depId format
      })
      .then((response) => {
        setUsers((prev) =>
          prev.map((user) => (user.id === id ? response.data : user))
        );
        setEditingUserId(null);
        alert("User updated successfully.");
        window.location.reload(false);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        alert("Failed to update user. Please try again.");
      });
  };

  return (
    <div>
      <h1>User List</h1>
      <Link to="/add" className="btn btn-primary mb-3">
        Add User
      </Link>
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
              <td>{user.id}</td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    name="firstName"
                    value={editedData.firstName || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.firstName
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    name="lastName"
                    value={editedData.lastName || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.lastName
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    name="role"
                    value={editedData.role || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="email"
                    name="emailAddress"
                    value={editedData.emailAddress || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.emailAddress
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <select
                    name="depId"
                    value={editedData.depId || ""}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Department</option>
                    {departments.map((dep) => (
                      <option key={dep.id} value={dep.id}>
                        {dep.depName}
                      </option>
                    ))}
                  </select>
                ) : (
                  user.departmentName || "N/A"
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <>
                    <button
                      className="btn btn-success"
                      onClick={() => saveEdit(user.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={cancelEditing}
                      style={{ marginLeft: "10px" }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary"
                      onClick={() => startEditing(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteUser(user.id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
