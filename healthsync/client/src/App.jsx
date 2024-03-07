import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './screens/Login';
import Signup from './screens/Signup';
import Username from './components/Username';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import Password from './components/Password';
import PageNotFound from './components/PageNotFound';
import Profile from './components/Profile';
import Bmi from './components/Bmi';
import UserForm from './components/Recommendations';

import { AuthorizeUser, ProtectRoute } from './middleware/auth';



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} /> 
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signup" element={<Signup/>} />
          <Route exact path="/PageNotFound" element={<PageNotFound/>} />
          <Route exact path="/username" element={<Username/>} />  
          <Route exact path="/recovery" element={<Recovery/>} />
          <Route exact path="/reset" element={<Reset/>} />
          <Route exact path="/password" element={<ProtectRoute><Password/></ProtectRoute>} />
          <Route exact path="/profile" element={<AuthorizeUser><Profile/></AuthorizeUser>} />
          <Route exact path="/bmi" element={<Bmi/>} />
          <Route exact path="/recommendations" element={<UserForm/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
