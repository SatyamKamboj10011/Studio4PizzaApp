import React, { useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
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
  CircularProgress,
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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
      url = "http://localhost:5000/add/side";
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
    } finally {
      setLoading(false);
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
    <Container style={{ padding: "20px" }}>
      <Box
        style={{
          marginTop: "5rem",
          marginBottom: "5rem",
          padding: "2rem",
          borderRadius: "15px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ fontWeight: "bold", color: "#ff4b2b" }}
        >
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
                style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
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
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
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
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
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
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
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
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
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
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
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
                style={{
                  padding: "10px",
                  borderStyle: "dashed",
                  borderColor: "#ff4b2b",
                  color: "#ff4b2b",
                }}
              >
                Upload Image
                <input type="file" hidden onChange={handleImageChange} required />
              </Button>
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginTop: "1rem",
                  }}
                />
              )}
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
                style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
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
                disabled={loading}
                style={{
                  borderRadius: "8px",
                  padding: "12px 24px",
                  marginTop: "2rem",
                  fontWeight: "bold",
                  backgroundColor: "#ff4b2b",
                  color: "#fff",
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Add Item"}
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