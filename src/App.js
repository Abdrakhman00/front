import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import { AuthContextProvider } from './Context/AuthContext.js'; // Убедитесь, что импортируете AuthContextProvider
import Home from './Pages/Home';
import Signin from './Pages/auth/Signin.js';
import MemberDashboard from './Pages/Dashboard/MemberDashboard/MemberDashboard.js';
import Allbooks from './Pages/books/Allbooks.js';
import Header from './Components/Header';
import AdminDashboard from './Pages/Dashboard/AdminDashboard/AdminDashboard.js';
import EmployeeDashboard from './Pages/Dashboard/EmployeeDashboard/EmployeeDashboard.js';
import SigninSystem from './Pages/auth/signSystem.js';

function App() {
  return (
    <AuthContextProvider> {/* Оберните ваше приложение в AuthContextProvider */}
      <Router>
        <Header />
        <div className="App">
          <Routes>
            <Route path='/auth/system' element={<SigninSystem />} />
            <Route path='/' element={<Home />} /> 
            <Route path='/signin' element={<Signin />} />
            <Route path='/dashboard/member' element={<MemberDashboard />} />
            <Route path='/profile/admin' element={<AdminDashboard />} />
            <Route path='/profile/employee' element={<EmployeeDashboard />} />
            <Route path='/books' element={<Allbooks />} />
          </Routes>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
