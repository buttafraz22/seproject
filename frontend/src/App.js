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

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path='/' element={<LandingPage />}/>
        <Route exact path={routes.login} element={<LogIn />}/>
        <Route exact path={routes.register} element={<Register />}/>
        <Route exact path={routes.userHome} element={<UserNavbar />}/>
        <Route exact path={routes.transaction} element={<MoneyDealing />}/>
        <Route exact path={routes.bills} element={<Bills />}/>
        <Route exact path={routes.transactionHistory} element={<TransactionPage />}/>
        <Route exact path={routes.adminHome} element={<AdminHome />}/>
        <Route exact path={routes.accountCRUD} element={<AdminAccountCRUD />}/>
        <Route exact path={routes.exchangeRates} element={<ExchangeRates />}/>
        <Route exact path={routes.giveFeedback} element={<Feedback />}/>
        <Route exact path={routes.displayFeedback} element={<AdminFeedbackDisplayes />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
/* Git debugging errors */