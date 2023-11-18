import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SendMoney(){
  const [accountName, setAccountName] = useState('');
  const [bankList, setBankList] = useState(['Meezan Bank', 'HBL']);
  const [selectedBank, setSelectedBank] = useState('');
  const [sendMoney, setSendMoney] = useState(0);
  const [accountNumber, setAccountNumber] = useState('');

  /* useEffect(() => {
    // Fetch bank list from the API endpoint
    const fetchBankList = async () => {
      try {
        const response = await axios.get('your_api_endpoint_for_banks');
        setBankList(response.data); // Assuming the API returns an array of bank objects
      } catch (error) {
        console.error('Error fetching bank list:', error);
      }
    };

    fetchBankList();
  }, []); */

  const handleAccountNameChange = (event) => {
    setAccountName(event.target.value);
  };

  const handleBankChange = (event) => {
    setSelectedBank(event.target.value);
  };

  const handleMoneyChange = (event) =>{
    setSendMoney(event.target.value);
  }
  const handleAccountNuberChange = (event)=> {
    setAccountNumber(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission (you can perform actions here)
    console.log('Submitted Account Name:', accountName);
    console.log('Selected Bank:', selectedBank);
  };

  return (
    <>
      <h1 className='text-center mt-3'> Send Money to Account Holder</h1>
      <form className='form-money-transfer' onSubmit={handleSubmit}>
        <div className='row'>
          <div className="col-md-5">
          <label htmlFor="accountName">Account Name:</label>
          </div>
          <div className='col-md-7'>
            <input
              type="text"
              id="accountName"
              value={accountName}
              onChange={handleAccountNameChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-5">
          <label htmlFor="accountNumber">Account Number:</label>
          </div>
          <div className="col-md-7 mr-auto">
            <input
              type="text"
              id="accountNumber"
              value={accountNumber}
              onChange={handleAccountNuberChange}
            />
          </div>
        </div>
        <div className='select-bank row'>
          <div className="col-md-5">
            <label htmlFor="bank">Select Bank:</label>
          </div>
          <div className="col-md-7 mr-auto">
            <select id="bank" value={selectedBank} onChange={handleBankChange}>
              <option value="">Select a bank</option>
              {bankList.map((bank, i) => (
                <option key={i} value={bank.name}>  {/* yhan p id dalni ha key k btor */}
                  {bank}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            Amount of Transfer Money
          </div>
          <div className="col-md-7">
          <input
              type="number"
              id="sendMoney"
              value={sendMoney}
              onChange={handleMoneyChange}
            />
          </div>
        </div>
        <button className='btn btn-primary'type="submit">Send</button>
    </form>
    </>
  );
};
