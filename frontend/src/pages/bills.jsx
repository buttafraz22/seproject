import React from 'react'
import UserNavbar from '../components/UserNavbar'
import BillsPayment from '../components/BillsPayment'

export default function Bills() {
  return (
    <div>
      <UserNavbar />

      <h1 className='mt-3 pt-3 text-center'> Pay your Bills</h1>
      <BillsPayment />
    </div>
  )
}
