import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import LoggedInUser from './pages/LoggedInUser'
import LogIn from './pages/LogIn'
import NewBank from './pages/NewBank'
import NewCustomer from './pages/NewCustomer'
import OrgLoggedin from './pages/OrgLoggedin';

function App() {
  

  return (
    <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path = "/login" element = {<LogIn/>}/>
      <Route path="/new-customer" element={<NewCustomer />} />
      <Route path="/new-organisation" element={<NewBank />} />
      <Route path="/user/:hash" element={<LoggedInUser />} />
      <Route path ="org/:hash" element = {<OrgLoggedin />}/>

    </Routes>
  </Router>
  )
}

export default App
