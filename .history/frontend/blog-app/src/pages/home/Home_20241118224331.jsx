import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import axios from 'axios';

const BlogCard = ({ title, story, location, imageUrl, visitedDate, id, isFavorite, onFavoriteToggle }) => {

  const handleFavoriteToggle = async () => {
    try {
      await axios.put(`http://localhost:8000/update_is_favorite/${id}`, { isFavorite: !isFavorite });
      onFavoriteToggle(id, !isFavorite);
    } catch (error) {
      console.error('Error toggling favorite status', error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{story}</Typography>
        <Typography variant="body2">Visited Location: {location}</Typography>
        <Typography variant="body2">Visited Date: {visitedDate}</Typography>
      </CardContent>
      {imageUrl && (
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt="Story image"
        />
      )}
      <CardActions>
        <Button
          onClick={handleFavoriteToggle}
          variant="outlined"
          sx={{ marginLeft: 'auto' }}
        >
          {isFavorite ? 'Unfavorite' : 'Favorite'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
