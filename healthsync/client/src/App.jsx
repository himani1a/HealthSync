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
          <Route exact path="/password" element={<Password/>} />
          <Route exact path="/profile" element={<Profile/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
