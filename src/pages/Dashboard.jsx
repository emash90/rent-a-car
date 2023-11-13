import React from 'react'
import NavbarComponent from '../components/NavbarComponent'
import SideBarNav from '../components/SideBarNav'

const Dashboard = ({ user }) => {
  return (
    <div>
      <NavbarComponent user={user} />
    </div>
  )
}

export default Dashboard
