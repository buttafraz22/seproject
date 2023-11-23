import React, { useState, useEffect } from 'react';
import axios from 'axios'

const ExchangeRatesTable = () => {
    const [rates, setRates] = useState({});
    const [currencyFrom, setCurrencyFrom] = useState('EUR');
    const [currencyTo, setCurrencyTo] = useState('USD');
    const [amount, setAmount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 20;

    useEffect(() => {

        const fetchData = () => {
            const currentDate = new Date().toISOString().split('T')[0];

            // Replace 'YOUR_FIXER_IO_API_KEY' with your actual API key
            const apiUrl = `http://data.fixer.io/api/${currentDate}?base=EUR&access_key=c72fd99f19aba88d3e57d36751b193ac`;

            const response = axios.get(apiUrl);

            /* console.log(response) */

            response.then(success => {
                if (success) {
                    // console.log(success.data)
                    setRates(success.data.rates)

                    // console.log(rates)
                }
            }).catch(error => {
                alert('Feature unavailable, try later.')
            })
        }

        fetchData();
    }, []);

    const handleCurrencyFromChange = (e) => {
        setCurrencyFrom(e.target.value);
    };

    const handleCurrencyToChange = (e) => {
        setCurrencyTo(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const convertCurrency = () => {
        const rateFrom = rates[currencyFrom];
        const rateTo = rates[currencyTo];
        const convertedAmount = (amount * rateTo) / rateFrom;
        return convertedAmount.toFixed(2);
    };

    const totalPages = Math.ceil(Object.keys(rates).length / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedRates = Object.entries(rates).slice(startIndex, endIndex);

    return (
        <div className='bs mt-4'>
            <h1 className='text-center mt-3'> Exchange Rates Module</h1>
            <div className='bs'>
                <h2 className='ml-1'> Convert Rates</h2>
                <div className="col-md-6">
                    <label className='m-3'>
                        Convert from:
                        <select value={currencyFrom} onChange={handleCurrencyFromChange}>
                            {Object.keys(rates).map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="col-md-6">
                    <label className='m-3'>
                        Convert to:
                        <select value={currencyTo} onChange={handleCurrencyToChange}>
                            {Object.keys(rates).map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>



                <label className='m-3'>
                    Amount:
                    <input type="number" value={amount} onChange={handleAmountChange} />
                </label>

                <h5 className='m-3'>
                    Result: {amount} {currencyFrom} = {convertCurrency()} {currencyTo}
                </h5>
            </div>

            <h2 className='ml-1 mb-3'>Currency Rates (relative to EUR)</h2>

            <div className="text-center my-auto">
                <table className='table table-striped table-bordered mx-auto'>
                    <thead className='thead-light'>
                        <tr>
                            <th>Currency</th>
                            <th>Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedRates.map(([currency, rate]) => (
                            <tr key={currency}>
                                <td>{currency}</td>
                                <td>{rate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination buttons */}
            <div className='text-center my-auto'>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button key={index + 1} onClick={() => handlePageChange(index + 1)}
                     className='btn btn-info mx-1'>
                        {index + 1}
                    </button>
                ))}
            </div>

        </div>
    );
};

export default ExchangeRatesTable;
