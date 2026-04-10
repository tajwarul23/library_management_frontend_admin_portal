import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import VerifyEmail from './Pages/VerifyEmail'
import AdminLayout from './Components/Layouts/AdminLayout'
const App = () => {
  return (
    <Router>
       <Routes>
        <Route path="/login"        element={<Login />} />
        <Route path="/register"     element={<Register />} />
        <Route path="api/auth/verify-email" element={<VerifyEmail />} />
        <Route path="/*"            element={<AdminLayout />} />
      </Routes>
    </Router>
  )
}

export default App
