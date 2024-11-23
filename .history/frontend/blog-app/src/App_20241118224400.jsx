import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Login from "./pages/auth/Login.jsx";
import SignUp from "./pages/auth/SignUp.jsx";
import Home from "./pages/home/Home.jsx";

import React, { useState } from 'react';
import AddBlogForm from './AddBlogForm';
import Home from './BlogCard';
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
      <AddBlogForm onStoryAdded={handleStoryAdded} />
      <Box sx={{ marginTop: 3 }}>
        <Grid container spacing={2}>
          {stories.map((story) => (
            <Grid item xs={12} sm={6} md={4} key={story.id}>
              <BlogCard
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

