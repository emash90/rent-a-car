import React, { useEffect, useState } from 'react'
import SideBarNav from '../components/SideBarNav'
import AllPackagesComponent from '../components/AllPackagesComponent'
import NavbarComponent from '../components/NavbarComponent'

import { Auth } from 'aws-amplify'
import AvailableCarsComponent from '../components/AvailableCarsComponent'

const AllPackages = () => {
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
        <NavbarComponent />
        <SideBarNav />
        { user_type && user_type === 'merchant' ? (
            <AllPackagesComponent />
        ) : (
            <AvailableCarsComponent />
        )}
    </div>
  )
}

export default AllPackages
