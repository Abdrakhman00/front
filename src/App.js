import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import { AuthContextProvider } from './Context/AuthContext.js';
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
import ProtectedRoute from './ProtectedRoute.js';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Header />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/signin" element={<Signin />} />
            <Route path="/auth/system" element={<SigninSystem />} />
            
            <Route 
              path="/employee/dashboard" 
              element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} 
            /> 
            <Route 
              path="/reader/dashboard" 
              element={<ProtectedRoute><ReaderList /></ProtectedRoute>} 
            />
            <Route 
              path="/employee/:id" 
              element={<ProtectedRoute><EmployeeDetails /></ProtectedRoute>} 
            />
            <Route 
              path="/profile/admin" 
              element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} 
            />
            <Route 
              path="/profile/employee" 
              element={<ProtectedRoute><EmployeeDashboard /></ProtectedRoute>} 
            />
            <Route 
              path="/reader/:id" 
              element={<ProtectedRoute><ReaderDetails /></ProtectedRoute>} 
            />
            <Route 
              path="/profile/:id" 
              element={<ProtectedRoute><MemberDashboard /></ProtectedRoute>} 
            />
            <Route 
              path="/books" 
              element={<ProtectedRoute><Allbooks /></ProtectedRoute>} 
            />
          </Routes>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
