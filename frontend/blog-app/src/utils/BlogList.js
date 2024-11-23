import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard'; // Import BlogCard component
import axiosInstance from '../utils/axiosInstance'; // Import axiosInstance

const BlogList = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    // Fetch the stories when the component is mounted
    const fetchStories = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:8000/get_stories');
        setStories(response.data); // Assuming the data is in response.data
      } catch (error) {
        console.error('Error fetching stories', error);
		console.log(id);
      }
    };

    fetchStories();
  }, []);

  const handleFavoriteToggle = (id, newFavoriteStatus) => {
    setStories((prevStories) =>
      prevStories.map((story) =>
        story.id === id ? { ...story, isFavorite: newFavoriteStatus } : story
      )
    );
  };

  const handleDelete = (id) => {
    setStories((prevStories) => prevStories.filter((story) => story._id !== id));
	
  };

  return (
    <div>
      {stories.map((story) => (
        <BlogCard
          
          id={story._id}
          title={story.title}
          story={story.story}
          location={story.location}
          visitedDate={story.visitedDate}
          imageUrl={story.imageUrl}
          isFavorite={story.isFavorite}
          onFavoriteToggle={handleFavoriteToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default BlogList;
