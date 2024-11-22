import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import Login from "./components/Login"

function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || null);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route
          path="/users"
          element={
            userRole ? (
              <UserList userRole={userRole} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
