import React, { useState } from "react";
import axios from "axios";
import { Container, Alert } from "react-bootstrap";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  IconButton,
} from "@mui/material";
import { Close, CloudUpload } from "@mui/icons-material";

const AddMenuPage = () => {
  // State for form data
  const [name, setName] = useState("");
  const [type, setType] = useState("pizza"); // Default type is pizza
  const [smallPrice, setSmallPrice] = useState("");
  const [largePrice, setLargePrice] = useState("");
  const [extraLargePrice, setExtraLargePrice] = useState("");
  const [price, setPrice] = useState(""); // Used for sides and desserts
  const [image, setImage] = useState(null); // Image file for upload
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);

    // Handle prices differently for pizza and sides/desserts
    if (type === "pizza") {
      formData.append("small_price", parseFloat(smallPrice));
      formData.append("large_price", parseFloat(largePrice));
      formData.append("extra_large_price", parseFloat(extraLargePrice));
    } else if (type === "side") {
      formData.append("small_price", parseFloat(smallPrice));
      formData.append("large_price", parseFloat(largePrice));
    } else {
      formData.append("price", parseFloat(price)); // For sides and desserts
    }

    // Determine the API URL based on the type
    let url = "";
    if (type === "pizza") {
      url = "http://localhost:5000/add/pizza";
    } else if (type === "side") {
      url = "http://localhost:5000/side";
    } else if (type === "desserts") {
      url = "http://localhost:5000/add/desserts";
    }

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data); // Success message from backend
      setOpenSnackbar(true);
      // Reset form after successful submission
      setName("");
      setType("pizza");
      setSmallPrice("");
      setLargePrice("");
      setExtraLargePrice("");
      setPrice("");
      setImage(null);
      setDescription("");
    } catch (error) {
      console.error("Error adding item:", error);
      if (error.response) {
        setMessage(`Error: ${error.response.data}`); // Show backend error message
      } else {
        setMessage("Error adding item. Please try again.");
      }
      setOpenSnackbar(true);
    }
  };

  // Validate image type
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileTypes = /jpeg|jpg|png|gif/;
    const maxSize = 5 * 1024 * 1024; // Max file size of 5MB

    if (file && !fileTypes.test(file.type)) {
      alert("Invalid file type. Please upload an image (jpg, jpeg, png, gif).");
      setImage(null); // Reset image if invalid
    } else if (file && file.size > maxSize) {
      alert("File is too large. Max size is 5MB.");
      setImage(null);
    } else {
      setImage(file); // Set image if valid
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Box
        sx={{
          marginTop: 5,
          marginBottom: 5,
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
          Add Menu Item
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            {/* Name Field */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                variant="outlined"
                size="small"
                sx={{ backgroundColor: "background.paper" }}
              />
            </Grid>

            {/* Type Field */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel>Type</InputLabel>
                <Select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  label="Type"
                  required
                  sx={{ backgroundColor: "background.paper" }}
                >
                  <MenuItem value="pizza">Pizza</MenuItem>
                  <MenuItem value="side">Side</MenuItem>
                  <MenuItem value="desserts">Dessert</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Price Fields for Pizza or Side */}
            {(type === "pizza" || type === "side") && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Small Price"
                    type="number"
                    fullWidth
                    value={smallPrice}
                    onChange={(e) => setSmallPrice(e.target.value)}
                    required
                    variant="outlined"
                    size="small"
                    sx={{ backgroundColor: "background.paper" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Large Price"
                    type="number"
                    fullWidth
                    value={largePrice}
                    onChange={(e) => setLargePrice(e.target.value)}
                    required
                    variant="outlined"
                    size="small"
                    sx={{ backgroundColor: "background.paper" }}
                  />
                </Grid>
                {type === "pizza" && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Extra Large Price"
                      type="number"
                      fullWidth
                      value={extraLargePrice}
                      onChange={(e) => setExtraLargePrice(e.target.value)}
                      required
                      variant="outlined"
                      size="small"
                      sx={{ backgroundColor: "background.paper" }}
                    />
                  </Grid>
                )}
              </>
            )}

            {/* Price Field for Dessert */}
            {type === "desserts" && (
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Price"
                  type="number"
                  fullWidth
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  variant="outlined"
                  size="small"
                  sx={{ backgroundColor: "background.paper" }}
                />
              </Grid>
            )}

            {/* Image Field */}
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<CloudUpload />}
                sx={{
                  padding: "10px",
                  borderStyle: "dashed",
                  borderColor: "primary.main",
                  color: "primary.main",
                  "&:hover": {
                    borderColor: "secondary.main",
                    color: "secondary.main",
                  },
                }}
              >
                Upload Image
                <input type="file" hidden onChange={handleImageChange} required />
              </Button>
            </Grid>

            {/* Description Field */}
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                variant="outlined"
                size="small"
                sx={{ backgroundColor: "background.paper" }}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                size="large"
                sx={{
                  borderRadius: "8px",
                  padding: "12px 24px",
                  marginTop: 2,
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                  },
                }}
              >
                Add Item
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      {/* Snackbar for Success/Error Messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={message}
        action={
          <IconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
};

export default AddMenuPage;