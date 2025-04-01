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
  Paper,
  Divider,
} from "@mui/material";
import { Close, CloudUpload, LocalPizza, Restaurant, Cake, Euro } from "@mui/icons-material";
import { styled as muiStyled } from '@mui/material/styles';
import styled, { keyframes, css } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInAnimation = css`
  animation: ${fadeIn} 0.6s ease-out;
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 40px 0;
`;

const FormBox = muiStyled(Paper)(({ theme }) => ({
  padding: '3.5rem',
  borderRadius: '30px',
  backgroundColor: '#ffffff',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease-in-out',
  opacity: 0,
  transform: 'translateY(20px)',
  animation: 'fadeIn 0.6s ease-out forwards',
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.12)',
  },
}));

const StyledTextField = muiStyled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.15)',
      borderRadius: '12px',
      transition: 'all 0.2s ease',
    },
    '&:hover fieldset': {
      borderColor: '#ff4b2b',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ff4b2b',
      borderWidth: '2px',
    },
    '& input': {
      padding: '15px',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#666',
    '&.Mui-focused': {
      color: '#ff4b2b',
    },
  },
});

const StyledFormControl = muiStyled(FormControl)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    '& fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.15)',
      transition: 'all 0.2s ease',
    },
    '&:hover fieldset': {
      borderColor: '#ff4b2b',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ff4b2b',
      borderWidth: '2px',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#666',
    '&.Mui-focused': {
      color: '#ff4b2b',
    },
  },
  '& .MuiSelect-select': {
    padding: '15px',
  },
});

const UploadButton = styled(Button)`
  border-radius: 12px;
  padding: 15px 25px;
  border: 2px dashed #ff4b2b;
  color: #ff4b2b;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 75, 43, 0.03);
  text-transform: none;
  
  &:hover {
    background: rgba(255, 75, 43, 0.08);
    border-color: #ff416c;
    transform: translateY(-2px);
  }

  .MuiSvgIcon-root {
    margin-right: 10px;
    font-size: 1.5rem;
  }
`;

const SubmitButton = styled(Button)`
  background: linear-gradient(45deg, #ff4b2b, #ff416c);
  border-radius: 12px;
  padding: 15px 35px;
  font-weight: 600;
  font-size: 1.1rem;
  text-transform: none;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(255, 75, 43, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(255, 75, 43, 0.4);
    background: linear-gradient(45deg, #ff416c, #ff4b2b);
  }

  &:disabled {
    background: #ccc;
  }
`;

const ImagePreview = styled.div`
  margin-top: 1.5rem;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
  }
  
  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%);
    pointer-events: none;
  }
`;

const SectionTitle = styled(Typography)`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #ff4b2b, #ff416c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
`;

const PriceSection = styled(Box)`
  position: relative;
  padding: 20px;
  background: rgba(255, 75, 43, 0.03);
  border-radius: 15px;
  margin: 10px 0;

  .price-icon {
    position: absolute;
    top: -15px;
    left: 20px;
    background: white;
    padding: 5px;
    border-radius: 50%;
    color: #ff4b2b;
  }
`;

const TypeIcon = ({ type }) => {
  switch (type) {
    case 'pizza':
      return <LocalPizza sx={{ color: '#ff4b2b', fontSize: 30 }} />;
    case 'side':
      return <Restaurant sx={{ color: '#ff4b2b', fontSize: 30 }} />;
    case 'desserts':
      return <Cake sx={{ color: '#ff4b2b', fontSize: 30 }} />;
    default:
      return null;
  }
};

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
      formData.append("price", parseFloat(price)); // For sides and desserts and drinks
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
    else if(type === "drinks"){
      url = "http://localhost:5000/add/drinks"
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
    <PageWrapper>
      <Container maxWidth="md">
        <FormBox elevation={0}>
          <Box textAlign="center" mb={5}>
            <TypeIcon type={type} />
            <SectionTitle variant="h4" gutterBottom>
              Add New {type.charAt(0).toUpperCase() + type.slice(1)}
            </SectionTitle>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
              Fill in the details below to add a new menu item
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  label="Name"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  size="medium"
                  placeholder="Enter item name"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <StyledFormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    label="Type"
                    required
                  >
                    <MenuItem value="pizza">Pizza</MenuItem>
                    <MenuItem value="side">Side</MenuItem>
                    <MenuItem value="desserts">Dessert</MenuItem>
                    <MenuItem value="drinks">Drinks</MenuItem>
                  </Select>
                </StyledFormControl>
              </Grid>

              {(type === "pizza" || type === "side") && (
                <Grid item xs={12}>
                  <PriceSection>
                    <Euro className="price-icon" />
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <StyledTextField
                          label="Small Price"
                          type="number"
                          fullWidth
                          value={smallPrice}
                          onChange={(e) => setSmallPrice(e.target.value)}
                          required
                          size="medium"
                          placeholder="0.00"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <StyledTextField
                          label="Large Price"
                          type="number"
                          fullWidth
                          value={largePrice}
                          onChange={(e) => setLargePrice(e.target.value)}
                          required
                          size="medium"
                          placeholder="0.00"
                        />
                      </Grid>
                      {type === "pizza" && (
                        <Grid item xs={12}>
                          <StyledTextField
                            label="Extra Large Price"
                            type="number"
                            fullWidth
                            value={extraLargePrice}
                            onChange={(e) => setExtraLargePrice(e.target.value)}
                            required
                            size="medium"
                            placeholder="0.00"
                          />
                        </Grid>
                      )}
                    </Grid>
                  </PriceSection>
                </Grid>
              )}

              {type === "desserts" && (
                <Grid item xs={12}>
                  <PriceSection>
                    <Euro className="price-icon" />
                    <StyledTextField
                      label="Price"
                      type="number"
                      fullWidth
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      size="medium"
                      placeholder="0.00"
                    />
                  </PriceSection>
                </Grid>
              )}
               {type === "drinks" && (
                <Grid item xs={12}>
                  <PriceSection>
                    <Euro className="price-icon" />
                    <StyledTextField
                      label="Price"
                      type="number"
                      fullWidth
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      size="medium"
                      placeholder="0.00"
                    />
                  </PriceSection>
                </Grid>
              )}

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Upload Item Image
                </Typography>
                <UploadButton
                  variant="outlined"
                  component="label"
                  fullWidth
                  startIcon={<CloudUpload />}
                >
                  Choose Image
                  <input type="file" hidden onChange={handleImageChange} required />
                </UploadButton>
                {image && (
                  <ImagePreview>
                    <img src={URL.createObjectURL(image)} alt="Preview" />
                  </ImagePreview>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Item Description
                </Typography>
                <StyledTextField
                  fullWidth
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  size="medium"
                  placeholder="Enter a detailed description of the item..."
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <SubmitButton
                  variant="contained"
                  type="submit"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Add to Menu"}
                </SubmitButton>
              </Grid>
            </Grid>
          </form>
        </FormBox>

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
    </PageWrapper>
  );
};

export default AddMenuPage;