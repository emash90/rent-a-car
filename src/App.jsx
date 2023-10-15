import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmRegister from './pages/ConfirmRegister'
import Dashboard from './pages/Dashboard'


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/confirm" element={<ConfirmRegister />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
