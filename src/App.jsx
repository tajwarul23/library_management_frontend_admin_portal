import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import VerifyEmail from "./Pages/VerifyEmail";
import AdminLayout from "./Components/Layouts/AdminLayout";
import VerifyNotice from "./Pages/VerifyNotice";
import ProtectedRoute from "./Pages/ProtectedRoute";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <Router>
       <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-notice" element={<VerifyNotice />} />
        {/* protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin-layout" element={<AdminLayout />} />
          {/* add more protected pages here */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
