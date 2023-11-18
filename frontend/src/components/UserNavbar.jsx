import React from 'react'
import LogoFinal from '../assets/logo-final.png'
import routes from '../router-config/routes-paths'

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
                                    <a className="nav-link" href="#">Payments History</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href={routes.transaction}>Make Payment</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Bill Payments</a>
                                </li>
                                <li className='nav-item'>
                                    <a className="nav-link" href="#">Give Feedback</a>
                                </li> 
                              </ul> 
                    </div> 
                </div> 
            </nav>
        </div>
    )
}
