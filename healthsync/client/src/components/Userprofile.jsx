import React, { useEffect, useState } from 'react';
import Navbar1 from '../components/Navbar1';
import backgroundImage from '../assets/back1.jpg';
import style from "../style/Username.css?inline";
import { getUser } from '../helper/helper'; // Adjust the import path as needed

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      const username = localStorage.getItem('username'); // Assuming the username is stored in local storage
      if (!username) {
        setError('No username found');
        setIsLoading(false);
        return;
      }

      const { data, error } = await getUser(username);

      if (error) {
        setError(error);
        setIsLoading(false);
      } else {
        setUser(data);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={containerStyle}>
      <Navbar1 />
      <div className={style['background-container']}>
        {user && (
          <div>
            <h2>User Profile</h2>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Phone Number: {user.phonenumber}</p>
            {/* Add more user details as needed */}
          </div>
        )}
      </div>
    </div>
  );
}
