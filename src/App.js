import Home from './Pages/Home';
import Signin from './Pages/auth/Signin.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 
import MemberDashboard from './Pages/Dashboard/MemberDashboard/MemberDashboard.js';
import Allbooks from './Pages/books/Allbooks.js';
import Header from './Components/Header';
import AdminDashboard from './Pages/Dashboard/AdminDashboard/AdminDashboard.js';
import SigninSystem from './Pages/auth/signSystem.js';

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route path='/auth/system' element={<SigninSystem />} />
          <Route path='/' element={<Home />} /> 
          <Route path='/signin' element={<Signin />} />
          <Route path='/dashboard/member' element={<MemberDashboard />} />
          <Route path='/profile' element={<AdminDashboard />} />
          <Route path='/books' element={<Allbooks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
