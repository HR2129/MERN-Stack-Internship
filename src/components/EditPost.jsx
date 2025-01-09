import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button } from '@mui/material';

const EditPost = ({ authToken }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setHeading(response.data.heading);
        setDescription(response.data.description);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [id, authToken]);

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/posts/${id}`,
        { heading, description },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      navigate('/posts');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <Container maxWidth="sm" className="mt-10">
      <Typography variant="h4" gutterBottom>Edit Post</Typography>
      <form onSubmit={handleUpdatePost}>
        <TextField
          label="Heading"
          variant="outlined"
          fullWidth
          margin="normal"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" className="mt-4">Update Post</Button>
      </form>
    </Container>
  );
};

export default EditPost;