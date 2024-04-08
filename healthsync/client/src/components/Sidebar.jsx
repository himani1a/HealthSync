
import { Link } from 'react-router-dom';
import Navbar1 from '../components/Navbar1'
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

  const { navigate } = useNavigate();




  const navLinkActiveStyle = {
    color: 'white',
    backgroundColor: '#495E57' // Here you can set the color to green or any hex value you prefer
  };
  function userLogout() {
    localStorage.removeItem('token');
    navigate('/')
  }

  const location = useLocation();
  const isMainUserPage = location.pathname === '/sidebar';
  return (
    <div className="container-fluid">
    <div className="row min-vh-100 flex-column flex-md-row">
      <Navbar1 />

      <aside className="col-12 col-md-3 col-xl-2 p-0 bg-light sidebar">

          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/sidebar" className="nav-link active" aria-current="page" style={navLinkActiveStyle}>
                Dashboard user
              </Link>
            </li>

          </ul>
          <br></br>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/profile" className="nav-link active" aria-current="page" style={navLinkActiveStyle}>
                Update profile
              </Link>
            </li>

          </ul>
          <br></br>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/userinfo" className="nav-link active" aria-current="page" style={navLinkActiveStyle}>
                User Information
              </Link>
            </li>

          </ul>
          <br></br>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/recommendations" className="nav-link active" aria-current="page" style={navLinkActiveStyle}>
                Generate Diet Plan
              </Link>
            </li>

          </ul>
          <br></br>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/SupplementRecommendations" className="nav-link active" aria-current="page" style={navLinkActiveStyle}>
                Supplements
              </Link>
            </li>

          </ul>
          <br></br>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/Bloglist" className="nav-link active" aria-current="page" style={navLinkActiveStyle}>
                Create Blog
              </Link>
            </li>

          </ul>
          <br></br>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/chat" className="nav-link active" aria-current="page" style={navLinkActiveStyle}>
                Chat
              </Link>
            </li>

          </ul>
          <br></br>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link onClick={userLogout} className="nav-link active" aria-current="page" style={navLinkActiveStyle} to="/" >
                Logout
              </Link>
            </li>

          </ul>
          <hr />
          </aside>
 
       
        <main className="col">
          {isMainUserPage && (
           <div className="card text-black bg-white mb-3 mx-auto no-hover-effect" style={{ maxWidth: '600px' }}>
            <div className="card-header"><h3><b>Welcome to Your Dashboard!</b></h3></div>
    <div className="card-body">
        <h5 className="card-title"><u>User Features</u></h5>
        <p className="card-text">
            Welcome to your personalized wellness journey. Discover your personalized meal plans for breakfast, lunch, and dinner, and track your daily nutritional intake to see how it compares with recommended values.
        </p>
        <p className="card-text">
            Enter your personal health information to get customized dietary recommendations. View your personalized meal plans including breakfast, lunch, and dinner options.
        </p>
        <p className="card-text">
            Access tips, articles, and blogs to help you make understand about health choices.
        </p>
        <p className="card-text">
            Manage your profile settings and preferences to enhance your experience with the app. Start by entering your health details under the profile section to receive your tailored dietary plan!
        </p>
    </div>
</div>
       
          )}
          <Outlet />
        </main>
      </div>
      </div>
 
  );
};

export default Sidebar;
