import React from "react";
import { styled } from "@mui/system";
import { Container, Typography, Button, Card, CardContent, Grid, Avatar, Divider } from "@mui/material";
import { Edit, History, Favorite } from "@mui/icons-material";

// Styled Components
const UserPageContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  background: "#f9f9f9",
  borderRadius: "15px",
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(2),
  border: "3px solid #ff4b2b",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: "#333",
  marginBottom: theme.spacing(2),
  fontSize: "1.5rem",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-10px",
    left: 0,
    width: "60px",
    height: "4px",
    background: "#ff4b2b",
    borderRadius: "2px",
  },
}));

const UserPage = () => {
  // Example user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://via.placeholder.com/150", // Replace with actual user avatar URL
    orders: [
      { id: 1, date: "2023-10-01", items: ["Margherita Pizza", "Garlic Bread"], total: "$25.99" },
      { id: 2, date: "2023-09-25", items: ["Pepperoni Pizza", "Coke"], total: "$30.50" },
    ],
    favorites: [
      { id: 1, name: "Margherita Pizza", image: "https://via.placeholder.com/100" },
      { id: 2, name: "Pepperoni Pizza", image: "https://via.placeholder.com/100" },
    ],
  };

  return (
    <UserPageContainer maxWidth="md">
      {/* User Profile Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: "center", padding: "20px", borderRadius: "15px", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)" }}>
            <UserAvatar alt={user.name} src={user.avatar} />
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {user.email}
            </Typography>
            <Button variant="contained" startIcon={<Edit />} sx={{ mt: 2, background: "#ff4b2b", "&:hover": { background: "#ff416c" } }}>
              Edit Profile
            </Button>
          </Card>
        </Grid>

        {/* Order History Section */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: "15px", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)" }}>
            <CardContent>
              <SectionTitle>
                <History sx={{ verticalAlign: "middle", mr: 1 }} />
                Order History
              </SectionTitle>
              {user.orders.map((order) => (
                <div key={order.id}>
                  <Typography variant="h6" fontWeight="bold">
                    Order #{order.id} - {order.date}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Items: {order.items.join(", ")}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Total: {order.total}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Favorites Section */}
      <Card sx={{ mt: 4, borderRadius: "15px", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)" }}>
        <CardContent>
          <SectionTitle>
            <Favorite sx={{ verticalAlign: "middle", mr: 1 }} />
            Favorites
          </SectionTitle>
          <Grid container spacing={2}>
            {user.favorites.map((favorite) => (
              <Grid item xs={12} sm={6} md={4} key={favorite.id}>
                <Card sx={{ textAlign: "center", padding: "10px", borderRadius: "15px", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)" }}>
                  <img src={favorite.image} alt={favorite.name} style={{ width: "100%", borderRadius: "10px" }} />
                  <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                    {favorite.name}
                  </Typography>
                  <Button variant="outlined" sx={{ mt: 1, color: "#ff4b2b", borderColor: "#ff4b2b", "&:hover": { borderColor: "#ff416c" } }}>
                    Order Again
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </UserPageContainer>
  );
};

export default UserPage;