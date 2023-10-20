import React from 'react'
import { Link } from 'react-router-dom'

const SideBarNav = () => {
  return (
    <div>
        <div className="sidebar">
            <ul className="sidebar-nav">
                <li className="sidebar-brand">
                    <Link to="/packages">Packages</Link>
                </li>
                <li>
                    <Link to="/create-package">Create Package</Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default SideBarNav
