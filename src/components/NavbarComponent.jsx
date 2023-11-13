import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


import { Auth } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const NavbarComponent = () => {
    const [loggedInUser, setLoggedInUser] = useState('')
    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await Auth.currentAuthenticatedUser()
                setLoggedInUser(user.attributes.email)
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [])

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
<Navbar expand="lg" className="bg-body-tertiary">
  <Container>
    <Navbar.Brand href="/">LOGO</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
    </Nav>
    { loggedInUser ? (
            <Nav>
            <NavDropdown title={loggedInUser} id="basic-nav-dropdown">
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2"></NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ) : (
            <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
        )
    }
  </Container>
</Navbar>


  )
}

export default NavbarComponent