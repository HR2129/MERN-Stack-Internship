import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Container, Typography, Button, TextField, Card, CardContent, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const Posts = ({ authToken }) => {
  const [posts, setPosts] = useState([]);
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const containerRef = useRef();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts', {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setPosts(response.data);
      } catch (error) {
        console.error(error);
        setPosts([]);
      }
    };
    fetchPosts();

    // gsap.from(containerRef.current, { opacity: 0, y: 50, duration: 1 });
  }, [authToken]);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/posts',
        { heading, description },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setPosts([...posts, response.data]); // Update posts with the new post
      setHeading('');
      setDescription('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleEditPost = (id) => {
    navigate(`/posts/edit/${id}`);
  };

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setPosts(posts.filter((post) => post.id !== id)); // Use correct id field
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container ref={containerRef} maxWidth="md" className="mt-10">
      <Typography variant="h4" gutterBottom>Posts</Typography>
      <form onSubmit={handleCreatePost}>
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
        <Button type="submit" variant="contained" color="primary" className="mt-4">Create Post</Button>
      </form>
      <div className="mt-10">
        {posts.map((post) => (
          <Card key={post.id} className="mt-4"> {/* Use correct id field */}
            <CardContent>
              <Typography variant="h5">{post.heading}</Typography>
              <Typography variant="body2" color="textSecondary">{post.description}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" onClick={() => handleEditPost(post.id)}>Edit</Button> {/* Use correct id field */}
              <Button size="small" color="secondary" onClick={() => handleDeletePost(post.id)}>Delete</Button> {/* Use correct id field */}
            </CardActions>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default Posts;