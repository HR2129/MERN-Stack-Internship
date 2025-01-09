import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import DisplayUsers from './components/DisplayUsers';
import Posts from './components/Posts';
import EditPost from './components/EditPost';
import PrivateRoute from './components/PrivateRoute';
import './index.css';

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Login setAuthToken={setAuthToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
          <Route path="/posts" element={
            <PrivateRoute authToken={authToken}>
              <Posts authToken={authToken} />
            </PrivateRoute>
          } />
          <Route path="/posts/edit/:id" element={
            <PrivateRoute authToken={authToken}>
              <EditPost authToken={authToken} />
            </PrivateRoute>
          } />
          <Route path="/users" element={
            <PrivateRoute authToken={authToken}>
              <DisplayUsers authToken={authToken} />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;