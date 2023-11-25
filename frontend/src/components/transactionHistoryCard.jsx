import React from 'react'

export default function TransactionHistoryCard({index, tran}) {
  return (
    <div className='card'>
      <div className="card-header">
          <h4>Transaction {index+1}: {tran.date}</h4>
      </div>
      <div className="card-body">
        <p>Transaction To: {tran.accountToName}</p>
        <p>Transaction To Id: {tran.accountTo}</p>
        <p>Transaction Balance : {tran.balance}</p>
      </div>
    </div>
  )
}
