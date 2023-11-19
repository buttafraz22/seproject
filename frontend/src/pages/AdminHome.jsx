import React from 'react'
import AdminNavbar from '../components/AdminNavbar'

export default function AdminHome() {
  return (
    <div>
      <AdminNavbar />

      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5">
            <h1> Welcome to Cuarto Admin Panel.</h1>
          </div>
        </div>

        <div className="row landing">
          <div className="col-md-6">
            <h2 className='mt-5'> Create Client Accounts.</h2>
          </div>
          <div className="col-md-6">
            <h2 className='mt-5'> Manage Client Feedbacks.</h2>
          </div>
        </div>

        <div className="row landing">
          <div className="col-md-6">
            <h2 className='mt-5'> Update Client Accounts.</h2>
          </div>
          <div className="col-md-6">
            <h2 className='mt-5'> Delete Client Feedbacks.</h2>
          </div>
        </div>

        <div className="row landing">
          <div>
            <h2 className='text-center mt-5'> Manage Client Balance.</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
