import React from 'react'
import LogoFinal from '../assets/logo-final.png'
import routes from '../router-config/routes-paths'
import { Link } from 'react-router-dom'

export default function UserNavbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                     <img src={LogoFinal} alt='Navbar Text' height={60}/>
                      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                         <span className="navbar-toggler-icon"></span> 
                    </button> 
                    <div className="collapse navbar-collapse" id="navbarNav">
                             <ul className="navbar-nav">
                                 <li className="nav-item">
                                    <a className="nav-link" href={routes.userHome}>Home</a>
                                </li> 
                                <li className="nav-item">
                                    <a className="nav-link" href="#">History</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href={routes.transaction}>Payment</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href={routes.bills}>Bills</a>
                                </li>
                                <li className='nav-item'>
                                    <a className="nav-link" href={routes.giveFeedback}>Feedback</a>
                                </li> 
                                <li className='nav-item'>
                                    <a className="nav-link" href={routes.exchangeRates}>Exchange Rates</a>
                                </li> 
                              </ul> 
                            <button type='button' className='btn btn-info ml-auto'>
                                <Link to={routes.login} className='cls-white'>
                                    Sign Out    
                                </Link>
                            </button>
                    </div> 
                </div> 
            </nav>
        </div>
    )
}
