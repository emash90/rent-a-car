import React from 'react'
import ConfirmRegisterComponent from '../components/ConfirmRegisterComponent'

const ConfirmRegister = ({ user }) => {
  return (
    <div>
      <ConfirmRegisterComponent user={user} />
    </div>
  )
}

export default ConfirmRegister
