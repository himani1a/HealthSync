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
import DietForm from './components/Recommendations';
import Recommendationsfood from './components/Recommendationsfood';
import SupplementRecommendations from './components/SupplementRecommendations';
import PaymentPage from './components/PaymentPage';
import SuccessPage from './components/SuccessPage';
import AdminLayout from './components/AdminLayout';
import AdminUsers from './components/AdminUsers';
import AdminDashboard from './components/AdminDashboard';
import AdminSettings from './components/AdminSettings';
import AdminTransactions from './components/AdminTransactions';
import BlogList from './components/BlogList';
import CreateBlog from './components/CreateBlog';
import BlogDetail from './components/BlogDetail';
import Sidebar from './components/Sidebar';
import AuthPage from './chat/AuthPage'
import ChatPage from './chat/ChatPage';
import HomeVideo from './Room/homevideo';
import RoomPage from './Room/RoomPage';
import { AuthorizeUser, ProtectRoute } from './middleware/auth';


function App() {
  const [user, setUser] = useState(undefined);
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/PageNotFound" element={<PageNotFound />} />
          <Route exact path="/username" element={<Username />} />
          <Route exact path="/recovery" element={<Recovery />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/password" element={<ProtectRoute><Password /></ProtectRoute>} />
          <Route exact path="/profile" element={<AuthorizeUser><Profile /></AuthorizeUser>} />
          <Route exact path="/bmi" element={<Bmi />} />
          <Route exact path="/recommendations" element={<DietForm />} />
          <Route path="/recommendationsfood" element={<Recommendationsfood />} />
          <Route path="/SupplementRecommendations" element={<SupplementRecommendations />} />
          <Route path="/PaymentPage" element={<PaymentPage />} />
          <Route path="/SuccessPage" element={<SuccessPage />} />
          <Route path="/admin" element={<AdminLayout />} >
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/transactions" element={<AdminTransactions />} />
          </Route>
          <Route path="/BlogList" element={<BlogList />} />
          <Route path="/CreateBlog" element={<CreateBlog />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/Sidebar" element={<Sidebar />} />
          {!user ? (
            <Route exact path="/Chat" element={<AuthPage onAuth={setUser} />} />
          ) : (
            <Route exact path="/Chat" element={<ChatPage user={user} />} />
          )}
          <Route path="/homevideo" element={<HomeVideo/>} />
          <Route path="/room/:roomId" element={<RoomPage />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
