import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Registered Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.email}>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Password (hashed): {user.password}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayUsers;