import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  Spinner,
} from "react-bootstrap";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Styled Components
const HeroSection = styled.div`
  background-image: url('https://images.unsplash.com/photo-1518013431117-eb1465fa5752?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 40px;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const HeroOverlay = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
`;

const StyledCard = styled(Card)`
  border-radius: 15px;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const CardImage = styled(Card.Img)`
  height: 220px;
  object-fit: cover;
`;

const SectionTitle = styled.h2`
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 40px;
`;

const PriceText = styled.div`
  font-weight: bold;
  color: #ff6347;
  margin-bottom: 10px;
`;

const CustomButton = styled(Button)`
  background: linear-gradient(45deg, #ff4b2b, #ff416c);
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-weight: bold;
  transition: 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 15px rgba(255, 75, 43, 0.3);
  }
`;

const SideMenu = () => {
  const [sides, setSides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [selectedSide, setSelectedSide] = useState(null);
  const [selectedSize, setSelectedSize] = useState("small");

  useEffect(() => {
    axios
      .get("http://localhost:5000/side")
      .then((res) => {
        setSides(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching sides:", err);
        setLoading(false);
      });
  }, []);

  const openModal = (side) => {
    setSelectedSide(side);
    setSelectedSize("small");
    setModalShow(true);
  };

  const addToCart = () => {
    const priceKey = selectedSize === "small" ? "small_price" : "large_price";
    const totalPrice = selectedSide[priceKey];
    const newItem = {
      item_id: selectedSide.id,
      name: selectedSide.name,
      category: "Side",
      size: selectedSize,
      quantity: 1,
      total_price: totalPrice,
      image: selectedSide.image,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, newItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    toast.success(`${selectedSide.name} added to cart! 🛒`);
    setModalShow(false);
  };

  return (
    <Container fluid>
      <HeroSection>
        <HeroOverlay>
          <h1 style={{ fontWeight: "bold", fontSize: "3rem" }}>🍟 Side Delights</h1>
          <p style={{ fontSize: "1.2rem" }}>Perfect pairings for your pizza cravings</p>
        </HeroOverlay>
      </HeroSection>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <Container className="my-5">
          <SectionTitle>Our Side Menu</SectionTitle>
          <Row className="g-4">
            {sides.map((side) => (
              <Col xs={12} sm={6} md={4} key={side.id}>
                <StyledCard>
                  <CardImage src={`http://localhost:5000/images/${side.image}`} alt={side.name} />
                  <Card.Body className="text-center">
                    <Card.Title>{side.name}</Card.Title>
                    <PriceText>
                      Small: ${side.small_price} | Large: ${side.large_price}
                    </PriceText>
                    <CustomButton onClick={() => openModal(side)}>Customize & Add</CustomButton>
                  </Card.Body>
                </StyledCard>
              </Col>
            ))}
          </Row>
        </Container>
      )}

      {/* Modal for Customization */}
      <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Customize Side</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSide && (
            <>
              <h5>{selectedSide.name}</h5>
              <img
                src={`http://localhost:5000/images/${selectedSide.image}`}
                alt={selectedSide.name}
                className="img-fluid rounded mb-3"
              />
              <Form.Group className="mb-3">
                <Form.Label>Choose Size</Form.Label>
                <Form.Select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="small">Small - ${selectedSide.small_price}</option>
                  <option value="large">Large - ${selectedSide.large_price}</option>
                </Form.Select>
              </Form.Group>
              <p>
                <strong>Total Price:</strong>{" "}
                ${selectedSize === "small" ? selectedSide.small_price : selectedSide.large_price}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={addToCart}>
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-center" autoClose={3000} />
    </Container>
  );
};

export default SideMenu;
