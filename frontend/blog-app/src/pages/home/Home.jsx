import React, { useState, useEffect } from "react";
import { Container, Grid, Box, IconButton, Modal, TextField, Button, Typography, Input, AppBar, Toolbar, Switch } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosInstance from "../../utils/axiosInstance";
import { convertToDate } from "./convertToDate"; // Use relative path with './'

const Home = () => {
  const [stories, setStories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newCard, setNewCard] = useState({
    _id: "",
    title: "",
    story: "",
    visitedLocation: "",
    imageUrl: "",
    visitedDate: "",
  });
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => {
    setNewCard({
      _id: "",
      title: "",
      story: "",
      visitedLocation: "",
      imageUrl: "",
      visitedDate: "",
    });
    setOpenModal(false);
  };

  const getAccessToken = () => localStorage.getItem("token");

  const fetchStories = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      console.error("No access token found.");
      window.location.href = "/login";
      return;
    }

    try {
      const response = await axiosInstance.get(`/get_all_stories?search=${searchQuery}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response.data && Array.isArray(response.data.stories)) {
        const formattedStories = response.data.stories.map((story) => ({
          ...story,
          visitedDate: convertToDate(story.visitedDate),
        }));
        setStories(formattedStories);
      } else {
        console.error("Invalid data structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  const handleSearch = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      console.error("No access token found.");
      window.location.href = "/login";
      return;
    }

    try {
      const response = await axiosInstance.get(`/search?query=${searchQuery}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response.data && Array.isArray(response.data.stories)) {
        const formattedStories = response.data.stories.map((story) => ({
          ...story,
          visitedDate: convertToDate(story.visitedDate),
        }));
        setStories(formattedStories);
      } else {
        console.error("Invalid data structure:", response.data);
      }
    } catch (error) {
      console.error("Error performing search:", error);
    }
  };

  useEffect(() => {
    fetchStories();
  }, [searchQuery]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard({
      ...newCard,
      [name]: value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const response = await axiosInstance.post("/image_upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setNewCard({
          ...newCard,
          imageUrl: response.data.imgUrl,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleStoryAddedOrUpdated = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      console.error("No access token found.");
      window.location.href = "/login";
      return;
    }

    try {
      const updatedStory = {
        title: newCard.title,
        story: newCard.story,
        visitedLocation: newCard.visitedLocation,
        imageUrl: newCard.imageUrl || "defaultImageUrl",
        visitedDate: newCard.visitedDate,
      };

      if (newCard._id) {
        const response = await axiosInstance.post(`/edit_story/${newCard._id}`, updatedStory, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setStories((prevStories) =>
          prevStories.map((story) =>
            story._id === newCard._id ? response.data.story : story
          )
        );
        console.log("Story updated successfully.");
      } else {
        const response = await axiosInstance.post("/add_blog_story", updatedStory, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setStories((prevStories) => [...prevStories, response.data.story]);
        console.log("Story added successfully.");
      }

      handleModalClose();
    } catch (error) {
      console.error("Error adding or updating story:", error.response?.data?.message || error.message);
    }
  };

  const handleEditStory = (story) => {
    setNewCard(story);
    handleModalOpen();
  };

  const handleDeleteStory = async (id) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      console.error("No access token found.");
      window.location.href = "/login";
      return;
    }

    try {
      await axiosInstance.delete(`/delete_story/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setStories((prevStories) => prevStories.filter((story) => story._id !== id));
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };

  const handleFavoriteToggle = async (id, isFavorite) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      console.error("No access token found.");
      window.location.href = "/login";
      return;
    }

    try {
      await axiosInstance.put(
        `/update_is_favorite/${id}`,
        { isFavorite: !isFavorite },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setStories((prevStories) =>
        prevStories.map((story) =>
          story._id === id ? { ...story, isFavorite: !isFavorite } : story
        )
      );
    } catch (error) {
      console.error("Error toggling favorite status", error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: darkMode ? "#121212" : "#fff",
        minHeight: "100vh",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <AppBar position="static" color={darkMode ? "primary" : "default"}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Blog
          </Typography>
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} color="default" />
        </Toolbar>
      </AppBar>

      <Container sx={{ padding: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
          <TextField
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flexGrow: 1 }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          <IconButton onClick={handleModalOpen} color="primary">
            <AddIcon />
          </IconButton>
        </Box>

        <Grid container spacing={3}>
          {stories.map((story) => (
            <Grid item xs={12} sm={6} md={4} key={story._id}>
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  p: 2,
                  position: "relative",
                  bgcolor: darkMode ? "#333" : "#fff",
                }}
              >
                {story.imageUrl && (
                  <img
                    src={story.imageUrl}
                    alt="Story"
                    style={{
                      width: "100%",
                      height: 150,
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "8px",
                    }}
                  />
                )}
                <Typography variant="h6">{story.title}</Typography>
                <Typography variant="body2">{story.story}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {story.visitedLocation} - {story.visitedDate}
                </Typography>
                <Box
                   sx={{
    display: "flex",
    justifyContent: "flex-start", // Aligns the buttons to the right
    gap: 0.5, // Adjust spacing between buttons
    marginTop: 1,
  }}
>
  <IconButton onClick={() => handleFavoriteToggle(story._id, story.isFavorite)}>
    <FavoriteIcon color={story.isFavorite ? "error" : "inherit"} />
  </IconButton>
  <IconButton onClick={() => handleEditStory(story)}>
    <EditIcon />
  </IconButton>
  <IconButton onClick={() => handleDeleteStory(story._id)}>
    <DeleteIcon />
  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Modal open={openModal} onClose={handleModalClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            {newCard._id ? "Edit Story" : "Add Story"}
          </Typography>
          <TextField
            name="title"
            label="Title"
            variant="outlined"
            fullWidth
            value={newCard.title}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            name="story"
            label="Story"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={newCard.story}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            name="visitedLocation"
            label="Location"
            variant="outlined"
            fullWidth
            value={newCard.visitedLocation}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            name="visitedDate"
            label="Visited Date"
            variant="outlined"
            fullWidth
            value={newCard.visitedDate}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />
          <Input type="file" onChange={handleImageUpload} sx={{ marginBottom: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleStoryAddedOrUpdated} variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={handleModalClose} variant="contained" color="secondary">
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Home;
