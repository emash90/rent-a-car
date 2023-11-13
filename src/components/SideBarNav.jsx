import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Auth } from 'aws-amplify'

const SideBarNav = () => {
    const [loggedInUser, setLoggedInUser] = useState('')
    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await Auth.currentAuthenticatedUser()
                setLoggedInUser(user.attributes)
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [])
    const user_type = loggedInUser ? loggedInUser['custom:user_type'] : null
  return (
    <div>
        { user_type && user_type === 'merchant' ? (
                    <div className="sidebar">
                    <ul className="sidebar-nav">
                        <li className="sidebar-brand">
                            <Link to="/cars">My Cars</Link>
                        </li>
                        <li>
                            <Link to="/add-car">Add a Car</Link>
                        </li>
                    </ul>
                </div>
                ) : (
                    <div className="sidebar">
                    <ul className="sidebar-nav">
                        <li className="sidebar-brand">
                            <Link to="/home">Available Cars</Link>
                        </li>
                    </ul>
                </div>
                    )}
    </div>
  )
}

export default SideBarNav
