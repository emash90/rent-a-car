import React from 'react'
import SideBarNav from '../components/SideBarNav'
import AllPackagesComponent from '../components/AllPackagesComponent'
import NavbarComponent from '../components/NavbarComponent'

const AllPackages = () => {
  return (
    <div>
        <NavbarComponent />
        <SideBarNav />
        <AllPackagesComponent />
    </div>
  )
}

export default AllPackages
