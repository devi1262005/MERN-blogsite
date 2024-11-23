import React, { useState } from 'react';
import { Container, Grid, Box, IconButton, Modal, TextField, Button, Typography, Input } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BlogCard from '../../utils/BlogCard';
 // Make sure this is your BlogCard component

const Home = () => {
  const [stories, setStories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newCard, setNewCard] = useState({
    title: '',
    subtitle: '',
    content: '',
    imageUrl: '',
  });
  const [imageFile, setImageFile] = useState(null);

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard({
      ...newCard,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setNewCard({
          ...newCard,
          imageUrl: fileReader.result, // Set image URL as base64 string (for local display or uploading to server)
        });
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleStoryAdded = () => {
    if (newCard.title && newCard.subtitle && newCard.content && imageFile) {
      setStories([...stories, { ...newCard, id: stories.length + 1 }]);
      setNewCard({ title: '', subtitle: '', content: '', imageUrl: '' }); // reset form
      setImageFile(null); // reset the file input
      handleModalClose();
    }
  };

  return (
    <Container sx={{ padding: 3 }}>
      {/* Button to open modal */}
      <IconButton onClick={handleModalOpen}>
        <AddIcon />
      </IconButton>

      {/* Modal for adding new card */}
      <Modal open={openModal} onClose={handleModalClose}>
        <Box sx={{ ...modalStyle, display: 'flex', flexDirection: 'column', padding: 3 }}>
          <Typography variant="h6">Add New Story</Typography>
          <TextField
            label="Title"
            name="title"
            value={newCard.title}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Subtitle"
            name="subtitle"
            value={newCard.subtitle}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Content"
            name="content"
            value={newCard.content}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />
          <Input
            type="file"
            onChange={handleImageUpload}
            sx={{ marginBottom: 2 }}
          />
          {newCard.imageUrl && (
            <img src={newCard.imageUrl} alt="Selected" style={{ width: '100%', height: 'auto', marginBottom: 2 }} />
          )}
          <Button onClick={handleStoryAdded} variant="contained">Add Story</Button>
        </Box>
      </Modal>

      {/* Render the added cards */}
      <Box sx={{ marginTop: 3 }}>
        <Grid container spacing={2}>
          {stories.map((story) => (
            <Grid item xs={12} sm={6} md={4} key={story.id}>
              <BlogCard {...story} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: 24,
  padding: 4,
};
