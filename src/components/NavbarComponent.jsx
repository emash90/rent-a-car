import React from 'react'
import { Auth } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const NavbarComponent = () => {
    const navigate = useNavigate()
    const logout = () => {
       try {
        Auth.signOut()
        navigate('/login')
        toast.success("Logged Out")
       } catch (error) {
        console.log("error signing out", error)   
        toast.error("Logout Failed")
       }

    }
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default NavbarComponent
