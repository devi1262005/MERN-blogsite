import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const AddBlogForm = ({ onStoryAdded }) => {
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [visitedDate, setVisitedDate] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/add_blog_story', {
        title,
        story,
        visitedLocation: location,
        imageUrl,
        visitedDate,
      });

      // Pass the new story data to parent component
      if (onStoryAdded) {
        onStoryAdded(response.data);
      }

      // Reset form after submission
      setTitle('');
      setStory('');
      setLocation('');
      setImageUrl('');
      setVisitedDate('');
    } catch (error) {
      console.error('Error adding story', error);
    }
  };

  return (
    <Box sx={{ width: 400, padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Add a New Story
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Story"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={story}
        onChange={(e) => setStory(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Visited Location"
        variant="outlined"
        fullWidth
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Image URL"
        variant="outlined"
        fullWidth
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Visited Date"
        variant="outlined"
        fullWidth
        value={visitedDate}
        onChange={(e) => setVisitedDate(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        Add Story
      </Button>
    </Box>
  );
};

export default AddBlogForm;
