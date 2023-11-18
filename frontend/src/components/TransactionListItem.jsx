import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function TransactionListItem() {
    const [transactions, setTransactions] = useState([{
        'id' : 'nirnfirf',
        'date': '2021-05-30T14:48:00.000Z',
        'paymentAmount': 769.00,
        'paymentAccount' : '1903422284832'
    }]);

    /* useEffect(() => {
      // Fetch transactions from API
      const fetchTransactions = async () => {
        try {
          const response = await axios.get('YOUR_API_ENDPOINT'); // Replace with your actual API endpoint
          setTransactions(response.data);
        } catch (error) {
          console.error('Error fetching transactions:', error);
        }
      };
  
      fetchTransactions();
    }, []); */ // Empty dependency array ensures the effect runs once on mount
  
    return (
      <div className="container mt-3" style={{scrollBehavior:'smooth'}}>
        <h2 className='m-2'>Transaction History</h2>
        <table className=" m-2 table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Account</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions? transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.date}</td>
                <td>{transaction.paymentAccount}</td>
                <td>₹{transaction.paymentAmount.toFixed(2)}</td>
              </tr>
            )) : <></>}
          </tbody>
        </table>
      </div>
    );
}

/* Git debugging errors */
