import './App.css'
import UserNavbar from './components/UserNavbar'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import MoneyDealing from './pages/MoneyDealing'
import LogIn from './pages/Login'
import Register from './pages/Register'
import routes from './router-config/routes-paths'
import Bills from './pages/bills'
import TransactionPage from './pages/TransactionPage'
import AdminHome from './pages/AdminHome'
import AdminAccountCRUD from './pages/AdminAccountCRUD'
import ExchangeRates from './pages/ExchangeRates'
import Feedback from './pages/Feedback'
import AdminFeedbackDisplayes from './pages/adminFeedbackDisplayes'
import UserHome from './pages/UserHome'
import navIcon1 from './assets/nav-icon1.svg';
import navIcon2 from './assets/nav-icon2.svg';
import navIcon3 from './assets/nav-icon3.svg';
import TransactionHistory from './pages/TransactionHistory'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path='/' element={<LandingPage />}/>
        <Route exact path={routes.login} element={<LogIn />}/>
        <Route exact path={routes.register} element={<Register />}/>
        <Route exact path={routes.userHome} element={<UserHome />}/>
        <Route exact path={routes.transaction} element={<MoneyDealing />}/>
        <Route exact path={routes.bills} element={<Bills />}/>
        {/* <Route exact path={routes.transactionHistory} element={<TransactionPage />}/> */}
        <Route exact path={routes.adminHome} element={<AdminHome />}/>
        <Route exact path={routes.accountCRUD} element={<AdminAccountCRUD />}/>
        <Route exact path={routes.exchangeRates} element={<ExchangeRates />}/>
        <Route exact path={routes.giveFeedback} element={<Feedback />}/>
        <Route exact path={routes.displayFeedback} element={<AdminFeedbackDisplayes />}/>
        <Route exact path={routes.transactionHistory} element={<TransactionHistory />}/>
      </Routes>
    </Router>
    <footer>
        <div className="" style={{ backgroundColor: "#1F1140" }}>
          <div className="container">
            <div className="row">
              <div className="col-md-6" style={{ color: "white" }}>
                <h3 className='mt-1'>About Us</h3>
                <p>Afraz is a junior year developer at UET Lahore.</p>
              </div>
              <div className="col-md-6 text-md-end mt-2 mt-md-0">
                <div className="icons mt-4">
                  <a href='https://www.linkedin.com/in/afraz-butt-555362261/' target="_blank" rel="noopener noreferrer"><img src={navIcon1} alt="LinkedIn" className="me-2" /></a>
                  <a href='https://github.com/buttafraz22' target="_blank" rel="noopener noreferrer"><img src={navIcon2} alt="Github" className="me-2" /></a>
                  <a href='https://www.instagram.com/buttafraz/' target="_blank" rel="noopener noreferrer"><img src={navIcon3} alt="Instagram" className="me-2" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
/* Git debugging errors */