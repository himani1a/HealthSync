import React, { useEffect, useState } from 'react';

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    username: '',
    email: '',
    phone: ''
  });

  const getAllUsersData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/admin/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/admin/users/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        getAllUsersData(); // Refresh the list of users
      } else {
        const data = await response.json();
        console.error('Failed to delete user:', data.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditFormChange = (event) => {
    setEditFormData({
      ...editFormData,
      [event.target.name]: event.target.value
    });
  };

  const updateUser = async (user) => {
    const updatedUser = {
      ...user,
      ...editFormData
    };

    try {
      const response = await fetch(`http://localhost:8000/api/admin/users/update/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser)
      });
      if (response.ok) {
        getAllUsersData(); // Refresh the list of users after update
        setEditingUser(null); // Exit edit mode
      } else {
        const data = await response.json();
        console.error('Failed to update user:', data.message);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <div>
      <section className="admin-users-section">
        <div className='container'>
          <h1>Admin Users</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  {editingUser === user._id ? (
                    <React.Fragment>
                      <td><input type="text" name="username" defaultValue={user.username} onChange={handleEditFormChange} /></td>
                      <td><input type="email" name="email" defaultValue={user.email} onChange={handleEditFormChange} /></td>
                      <td><input type="text" name="phone" defaultValue={user.phone} onChange={handleEditFormChange} /></td>
                      <td>
                        <button className="btn btn-success" onClick={() => updateUser(user)}>
                          Save
                        </button>
                        <button className="btn btn-secondary" onClick={() => setEditingUser(null)}>
                          Cancel
                        </button>
                      </td>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <button className="btn btn-primary" onClick={() => {
                          setEditingUser(user._id);
                          setEditFormData({ username: user.username, email: user.email, phone: user.phone });
                        }}>
                          Update
                        </button>
                        <button className="btn btn-danger" onClick={() => deleteUser(user._id)}>
                          Delete
                        </button>
                      </td>
                    </React.Fragment>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminUsers;
