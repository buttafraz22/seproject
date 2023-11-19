import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo-final.png';
import routesPaths from '../router-config/routes-paths';


export default function LandingPage() {
  return (
    <div className='landing-page'>
      <div className="glass-background container">
        <div className="content row align-items-center">
          <div className="col-md-6 image-container">
            <img src={Logo} alt="Background" className="img-fluid" />
          </div>
          <div className="col-md-6 text-container">
            <h2 className="display-4">Cuarto Bank</h2>
            <h1 className="h3"><em>A bank like no other!!</em></h1>
            <Link to={routesPaths.login}>
              <button type='button' className='btn btn-info'> Get Started </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
