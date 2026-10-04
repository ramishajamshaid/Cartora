import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminHeader from '../components/admin/AdminHeader'
import AdminBottomNav from '../components/admin/AdminBottomNav'

function AdminLayout() {
  return (
    <div className='flex h-screen w-full overflow-hidden'>
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        <AdminHeader />
        <main className='flex-1 min-h-0 overflow-y-auto p-4 mt-16 pb-20 lg:pb-4'>
          <Outlet />
        </main>
      </div>
      <AdminBottomNav/>
    </div>
  )
}

export default AdminLayout
