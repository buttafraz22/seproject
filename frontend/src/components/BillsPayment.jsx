import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'
import routesPaths from '../router-config/routes-paths'
import axios from 'axios'

export default function BillsPayment() {
    const [id, setId] = useState('')
    const [amount, setAmount] = useState(0)
    const [vendors, setVendors] = useState([])

    const navigate = useNavigate()

    const stripeKey = 'pk_test_51NdFjDHO3kvTfl2zZkWaXLIU17EsFDZY1WEf52fD0dtbQIkFzuz3EYDnfHYAhEfO5j2SI4D0XcUrtZGvJ78HydPi00qg7Ev918'

    const onToken = (token) => {
        const date = new Date();
        const billDetails = {
            id,
            date,
            token
        }

        const response = axios.post('/backend route', billDetails)
        response.then((success) => {
            navigate(routesPaths.userHome)
        })
    }
    return (
        <>
            <div className='m-5 p-2'>
                <label htmlFor="bill-id">Bill Transaction Id</label>
                <input
                    type='number'
                    name='bill-id'
                    minLength={8}
                    maxLength={15}
                    value={id}
                    onChange={(event) => {
                        setId(event.target.value)
                    }}
                    className='form-control'
                />
            </div>

            <div className='m-5 p-2'>
                <label htmlFor="amount"> Enter Amount</label>
                <input
                    type='number'
                    name='amount'
                    placeholder='Enter Payment Amount'
                    value={amount}
                    onChange={(event) => {
                        setAmount(event.target.value)
                    }}
                    className='form-control'
                />
            </div>

            <div className='m-5 p-2'>
                <StripeCheckout
                    amount={amount * 100}
                    token={onToken}
                    currency={'INR'}
                    stripeKey={stripeKey}
                />
            </div>
        </>
    )
}
