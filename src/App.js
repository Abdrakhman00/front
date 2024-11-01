import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import { AuthContextProvider } from './Context/AuthContext.js'; // Убедитесь, что импортируете AuthContextProvider
import Home from './Pages/Home';
import Signin from './Pages/auth/Signin.js';
import MemberDashboard from './Pages/Dashboard/ReaderDashboard/ReaderDashboard.js';
import Allbooks from './Pages/books/Allbooks.js';
import Header from './Components/Header';
import AdminDashboard from './Pages/Dashboard/AdminDashboard/AdminDashboard.js';
import EmployeeDashboard from './Pages/Dashboard/EmployeeDashboard/EmployeeDashboard.js';
import SigninSystem from './Pages/auth/signSystem.js';
import EmployeeList from './Pages/managment/employee/EmployeeList.js';
import EmployeeDetails from './Pages/managment/employee/components/EmployeeDetails.js';
import ReaderList from './Pages/managment/reader/ReaderList.js';
import ReaderDetails from './Pages/managment/reader/components/ReaderDetail.js';
function App() {
  return (
    <AuthContextProvider> {/* Оберните ваше приложение в AuthContextProvider */}
      <Router>
        <Header />
        <div className="App">
          <Routes>
            <Route path='/auth/system' element={<SigninSystem />} />
            <Route path='/' element={<Home />} /> 
            <Route path='/employee/dashboard' element={<EmployeeList />} /> 
            <Route path='/reader/dashboard' element={<ReaderList />} /> 
            <Route path="/employee/:id" element={<EmployeeDetails />} />
            <Route path="/reader/:id" element={<ReaderDetails />} />
            <Route path='/signin' element={<Signin />} />
            <Route path="/profile/:id" element={< MemberDashboard/>} /> 
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
