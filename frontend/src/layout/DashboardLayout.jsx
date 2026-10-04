import React from 'react'
import Header from '../components/home/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/home/Footer'

function DashboardLayout() {
  return (
    <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default DashboardLayout
