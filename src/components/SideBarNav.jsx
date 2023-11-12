import React from 'react'
import { Link } from 'react-router-dom'

const SideBarNav = () => {
  return (
    <div>
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
    </div>
  )
}

export default SideBarNav
