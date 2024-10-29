import Home from './Pages/Home';
import Signin from './Pages/Signin';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // заменяем Switch на Routes, Redirect на Navigate
import MemberDashboard from './Pages/Dashboard/MemberDashboard/MemberDashboard.js';
import Allbooks from './Pages/Allbooks';
import Header from './Components/Header';
import AdminDashboard from './Pages/Dashboard/AdminDashboard/AdminDashboard.js';
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext.js";

function App() {

  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Header />
      <div className="App">
        <Routes> {/* Заменяем Switch на Routes */}
          <Route exact path='/' element={<Home />} /> {/* Указываем элемент для каждой Route */}
          <Route
            exact
            path='/signin'
            element={user ? (user.isAdmin ? <Navigate to='/dashboard@admin' /> : <Navigate to='/dashboard@member' />) : <Signin />}
          />
          <Route
            exact
            path='/dashboard@member'
            element={user ? (user.isAdmin === false ? <MemberDashboard /> : <Navigate to='/' />) : <Navigate to='/' />}
          />
          <Route
            exact
            path='/profile'
            element={<AdminDashboard />}
          />
          <Route exact path='/books' element={<Allbooks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
