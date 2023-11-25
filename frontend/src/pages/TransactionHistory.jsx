import React, { useEffect, useState } from 'react'
import UserNavbar from '../components/UserNavbar'
import Cookies from 'js-cookie'
import axios from 'axios'
import TransactionHistoryCard from '../components/transactionHistoryCard'

export default function TransactionHistory() {
    const [transactions, setTransactions] = useState(null)
    useEffect(()=>{

        const getData = async() =>{
            const userDetails = JSON.parse(Cookies.get('userBankingApp'));

            const config = {
                headers: { Authorization: `Bearer ${userDetails.token}` },
            };
            const response = await axios.post(`http://localhost:3005/transaction/${userDetails.account._id}`,{}, config);
            
            if(response.status === 200){
                setTransactions(response.data)
            }
        }
        getData()
    },[])
  return (
    <div>
        <UserNavbar />
      {transactions?<>
        {transactions.map((tran, index) =>(
            <div className='my-3'>
                <TransactionHistoryCard tran={tran} index={index} key={index}/>
            </div>
        ))
        }
      </> : <>
        No Transacctions
      </>}
    </div>
  )
}
