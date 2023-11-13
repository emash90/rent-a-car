import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmRegister from './pages/ConfirmRegister'
import Dashboard from './pages/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Hub } from 'aws-amplify'
import AllPackages from './pages/AllPackages'
import PackageCreate from './pages/PackageCreate'
import ResetPassword from './pages/ResetPassword'
import PackageDetailsPage from './pages/PackageDetailsPage'

function App() {
  const [user, setUser] = useState(null)

  Hub.listen('auth', (data) => {
    switch (data.payload.event) {
      case 'signIn':
        console.log('user signed in')
        setUser(data.payload.data)
        break
      case 'signUp':
        console.log('user signed up')
        setUser(data.payload.data)
        break
      case 'signOut':
        console.log('user signed out')
        setUser(null)
        break
      case 'signIn_failure':
        console.log('user sign in failed')
        break
      case 'configured':
        console.log('the Auth module is configured')
        break
      default:
        console.log('default')
        break
    }
  })
//add a listener for api calls
  const apiListener = (data) => {
    console.log('api event', data)
  }
  Hub.listen('api', apiListener)

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/confirm" element={<ConfirmRegister user={user} />} />
        <Route path="/" element={<Dashboard user={user} />} />
        <Route path="/profile" element={<Dashboard user={user} />} />
        <Route path="/cars" element={<AllPackages />} />
        <Route path="/home" element={<AllPackages />} />
        <Route path="/cars/details" element={<PackageDetailsPage user={user} />} />
        <Route path="/add-car" element={<PackageCreate />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
