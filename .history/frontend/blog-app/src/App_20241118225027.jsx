
import React, { useState } from 'react';
import AddBlogCard from '../utils/addBlogCard.js';
import Home from './Home';
import { Container, Grid, Box } from '@mui/material';

const App = () => {
  const [stories, setStories] = useState([]);

  const handleStoryAdded = (newStory) => {
    setStories([...stories, newStory]);
  };

  const handleFavoriteToggle = (id, newStatus) => {
    setStories(stories.map(story =>
      story.id === id ? { ...story, isFavorite: newStatus } : story
    ));
  };

  return (
    <Container sx={{ padding: 3 }}>
      <AddBlogCard onStoryAdded={handleStoryAdded} />
      <Box sx={{ marginTop: 3 }}>
        <Grid container spacing={2}>
          {stories.map((story) => (
            <Grid item xs={12} sm={6} md={4} key={story.id}>
              <Home
                {...story}
                onFavoriteToggle={handleFavoriteToggle}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default App;

