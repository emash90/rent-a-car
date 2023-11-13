import React, { useState, useEffect} from 'react'
import NavbarComponent from '../components/NavbarComponent'
import SideBarNav from '../components/SideBarNav'
import PackageDetails from '../components/PackageDetails'
import ViewVehicleDetails from '../components/ViewVehicleDetails'

import { Auth } from 'aws-amplify'

const PackageDetailsPage = ({ user }) => {
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
  console.log("user is ====>", user)
  const user_type = loggedInUser ? loggedInUser['custom:user_type'] : null
  console.log("user type is ====>", user_type)
  return (
    <div>
      <NavbarComponent />
      <SideBarNav />
      { user_type && user_type === 'merchant' ? (
        <PackageDetails />
      ) : (
        <ViewVehicleDetails />
      )}
    </div>
  )
}

export default PackageDetailsPage
