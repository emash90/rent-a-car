import React from 'react'
import NavbarComponent from '../components/NavbarComponent'
import SideBarNav from '../components/SideBarNav'
import PackageDetails from '../components/PackageDetails'

const PackageDetailsPage = () => {
  return (
    <div>
      <NavbarComponent />
      <SideBarNav />
      <PackageDetails />
    </div>
  )
}

export default PackageDetailsPage
