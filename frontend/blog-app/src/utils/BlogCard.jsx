import React from 'react';
import { Card, CardContent, Typography, CardMedia, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box } from '@mui/system';

const BlogCard = ({ title, story, visitedLocation, imageUrl, visitedDate, isFavorite, onEdit, onDelete, onFavoriteToggle }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      {imageUrl && <CardMedia component="img" height="140" image={imageUrl} alt="Story image" />}
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {story.length > 100 ? `${story.substring(0, 100)}...` : story}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
          <Typography variant="caption" color="text.secondary">
            {visitedLocation} - {visitedDate}
          </Typography>
          <Box>
            <IconButton onClick={onEdit}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={onFavoriteToggle} color={isFavorite ? "secondary" : "default"}>
              <FavoriteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
