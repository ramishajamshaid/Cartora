import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthHeader from '../components/auth/AuthHeader'

function AuthLayout() {
  return (
    <>
      <AuthHeader/>
      <Outlet />
    </>
  )
}

export default AuthLayout
