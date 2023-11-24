import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import routesPaths from '../router-config/routes-paths';


export default function SendMoney() {
  const [accountName, setAccountName] = useState('');
  const [sendMoney, setSendMoney] = useState(0);
  const [accountNumber, setAccountNumber] = useState('');
  const userAccount = JSON.parse(Cookies.get('userBankingApp')).account
  const [userBalance, setUserBalance] = useState(userAccount.balance)
  const navigate = useNavigate();

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


  const handleMoneyChange = (event) => {
    setSendMoney(event.target.value);
  }
  const handleAccountNuberChange = (event) => {
    setAccountNumber(event.target.value);
  }
  const handleSubmit = async(event) => {
    event.preventDefault();
    // Handle form submission (you can perform actions here)
    if (!validateBalance) return;

    // balance has been validated at this point, proceed to the backend request
    const userDetails = JSON.parse(Cookies.get('userBankingApp'));

    const config = {
      headers: { Authorization: `Bearer ${userDetails.token}` },
    };
    const bodyParameters = {
      accountFrom : userAccount._id,
      accountTo : accountNumber,
      accountToName : accountName,
      balance : sendMoney
    }
    
    const response = await axios.post('http://localhost:3005/transaction/', bodyParameters, config);
    if (response.status === 201){
      
      navigate(routesPaths.userHome);
    }else{
      alert('Something went wrong. Try again!')
    }
  };

  const validateBalance = () => {
    if(sendMoney > userBalance){
      alert("You don't have enough money in your account");
      return false;
    }
    return true;
  }

  return (
    <>
      <h1 className='text-center mt-3'> Send Money to Account Holder</h1>
      <form className='form-money-transfer' onSubmit={handleSubmit}>

        <div className='row'>
          <div className="col-md-5">
            <label htmlFor="accountBalance">Your Balance:</label>
          </div>
          <div className='col-md-7'>
            <input
              type="text"
              id="accountBalance"
              value={userBalance}
              readonly
            />
          </div>
        </div>

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
            <label htmlFor="accountNumber">Account CNIC:</label>
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
        <button className='btn btn-primary' type="submit">Send</button>
      </form>
    </>
  );
};
