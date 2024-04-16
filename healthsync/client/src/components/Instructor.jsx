
import { Link } from 'react-router-dom';
import Navbar1 from '../components/Navbar1'
import backgroundImage from '../assets/bb.png';
import Footer from '../components/Footer'

import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/fetch.hook';

const Instructor = () => {

    const { navigate } = useNavigate();
    const [{ isLoading, apiData, serverError }] = useFetch(); // Using the custom hook to fetch user data


    const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden'
    };

    const sidebarStyle = {
 
        backgroundColor: 'white', 
        transition: 'width 0.5s',// Set the background color to white
    
      };
    const navLinkActiveStyle = {
        color: 'white',
        backgroundColor: '#495E57' 
    };
    function userLogout() {
        localStorage.removeItem('token');
        navigate('/')
    }



    const location = useLocation();
    const isMainUserPage = location.pathname === '/instructor';


    if (isLoading) return <p>Loading...</p>;
    if (serverError) return <p>{serverError.message}</p>;
    return (
        <div className={`container-fuild`} style={containerStyle}>
        <Navbar1 />
      <div className="row min-vh-100 flex-column flex-md-row">
     

        <aside className="col-12 col-md-2 col-xl-2 p-0 sidebar"style={sidebarStyle}>

        <hr />

          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/sidebar" className="nav-link active" aria-current="page" style={navLinkActiveStyle}>
              <i className="fas fa-home"></i> | Dashboard
              </Link>
            </li>

          </ul>
          <br></br>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/profile" className="nav-link active" aria-current="page" style={navLinkActiveStyle}>
              <i className="fas fa-user-edit"></i> | Update Profile
              </Link>
            </li>

          </ul>
          <br></br>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/userinfo" className="nav-link active" aria-current="page" style={navLinkActiveStyle}>
              <i className="fas fa-info-circle"></i> | User Information
              </Link>
            </li>

          </ul>
          <br></br>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/recommendations" className="nav-link active" aria-current="page" style={navLinkActiveStyle}>
              <i className="fas fa-utensils"></i> | Generate Diet Plan
              </Link>
            </li>

          </ul>
          <br></br>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/SupplementRecommendations" className="nav-link active" aria-current="page" style={navLinkActiveStyle}>
              <i className="fas fa-pills"></i> | Supplements

              </Link>
            </li>

          </ul>
          <br></br>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/Bloglist" className="nav-link active" aria-current="page" style={navLinkActiveStyle}>
              <i className="fas fa-blog"></i> | Create Blog
              </Link>
            </li>

          </ul>
          <br></br>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/chat" className="nav-link active" aria-current="page" style={navLinkActiveStyle}>
              <i className="fas fa-comments"></i> | Chat
              </Link>
            </li>

          </ul>
          <br></br>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/video" className="nav-link active" aria-current="page" style={navLinkActiveStyle}>
              <i className="fas fa-video"></i> | Join Class
              </Link>
            </li>

          </ul>
          <br></br>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link onClick={userLogout} className="nav-link active" aria-current="page" style={navLinkActiveStyle} to="/" >
              <i className="fas fa-sign-out-alt"></i> | Logout

              </Link>
            </li>

          </ul>
          <hr />
        </aside>

                <main className="col">
                    {isMainUserPage && (
                        <div className="card text-black bg-white mb-3 mx-auto no-hover-effect mt-4" style={{ maxWidth: '600px' }}>
                            <div className="card-header"><h3><b>Welcome to Your Dashboard, {apiData?.username}!</b></h3>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title"><u>Instructor Responsibilities</u></h5>
                                <p className="card-text">
                                    Access chat and call feature to guide the users.</p>
                                <p className="card-text">
                                    Make sure you add username instructor while accesing to chat with users.
                                </p>
                                <p className="card-text">
                                    Use the navigation links to access different sections.
                                </p>
                                <p className="card-text">
                                    Access tips, articles, and blogs to help you make understand about the user's health choices to guide them through their wellness journey.
                                </p>
                                <p className="card-text">
                                    Manage your profile settings and preferences to enhance your experience with the app.
                                </p>
                            </div>
                        </div>

                    )}
                    <Outlet />
                </main>
            </div>
            <div><Footer /></div>
        </div>

    );
};

export default Instructor;
