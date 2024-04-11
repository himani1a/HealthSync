import React from 'react';
import Navbar1 from '../components/Navbar1';
import useFetch from '../hooks/fetch.hook';
import backgroundImage from '../assets/back1.jpg';

function UserInfo() {
    const [{ isLoading, apiData, serverError }] = useFetch('/path/to/user/data/api');

    const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden'
    };

    if (isLoading) return <div>Loading...</div>;
    if (serverError) return <div>Error: {serverError.message}</div>;

    return (
        <div style={containerStyle}>
            <Navbar1 />
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-4">
                        {/* Profile Picture */}
                        <img src={apiData?.profile || 'defaultProfileImageUrl'} alt="Profile" className="img-fluid rounded-circle" />
                    </div>
                    <div className="col-md-8">
                        {/* User Information */}
                        <h2>{apiData?.username}</h2>
                        <p>Email: {apiData?.email}</p>
                        <p>Phone: {apiData?.phonenumber}</p>
                        <p>Address: {apiData?.address}</p>
                        {/* Add other user information fields as needed */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserInfo;
