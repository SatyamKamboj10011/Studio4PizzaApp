import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Sample pizza data
const pizzas = [
    {
        id: 1,
        name: 'Beef and Onion Pizza',
        images: [
            'https://images.unsplash.com/photo-1517003031656-b57c1e2957b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDE2fHxw/izza&ixlib=rb-1.2.1&q=80&w=400',
            'https://images.unsplash.com/photo-1574680147962-2e19d1f9f8f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDR8fHBpemphc3xlbnwwfHx8fDE2MzY3MDQ3OTY&ixlib=rb-1.2.1&q=80&w=400',
        ],
        description: 'A savory blend of beef and caramelized onions, topped with our special cheese.',
        prices: {
            small: 10.99,
            large: 15.99,
            extraLarge: 19.99,
        },
    },
    {
        id: 2,
        name: 'Margherita Pizza',
        images: [
            'https://images.unsplash.com/photo-1574680147962-2e19d1f9f8f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDR8fHBpemphc3xlbnwwfHx8fDE2MzY3MDQ3OTY&ixlib=rb-1.2.1&q=80&w=400',
            'https://images.unsplash.com/photo-1625508600907-e15931ee7c32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDMyfHxw/izza&ixlib=rb-1.2.1&q=80&w=400',
        ],
        description: 'Classic margherita with fresh tomatoes, basil, and mozzarella cheese.',
        prices: {
            small: 10.99,
            large: 15.99,
            extraLarge: 19.99,
        },
    },
    // Add more pizzas as needed...
];

// Styled components
const StyledContainer = styled(Container)`
    background-color: #f0f0f0; // Light background for contrast
    padding: 40px 0;
`;

const PizzaCard = styled(Card)`
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.05);
    }
`;

const StyledButton = styled(Button)`
    background-color: #007bff; // Blue button color
    color: white;
    font-weight: bold;
    border-radius: 25px;

    &:hover {
        background-color: #0056b3; // Darker blue on hover
    }
`;

const Heading = styled.h2`
    text-align: center;
    color: #333; // Dark text for contrast
    margin-bottom: 40px;
`;

const Description = styled.p`
    font-size: 1rem;
    color: #555; // Darker gray for description text
`;

const PriceText = styled(Card.Text)`
    font-weight: bold;
    color: #ff6f61; // Soft coral for prices
`;

function Pizza() {
    const [cart, setCart] = useState([]);

    const addToCart = (pizza, size, quantity) => {
        const price = pizza.prices[size];
        const totalPrice = price * quantity;

        const item = {
            name: pizza.name,
            size: size,
            quantity: quantity,
            totalPrice: totalPrice,
        };

        setCart([...cart, item]);
        console.log(`Added to cart: ${quantity} x ${pizza.name} (${size}) - Total: $${totalPrice.toFixed(2)}`);
    };

    return (
        <StyledContainer fluid>
            <Heading>🍕 Our Delicious Pizza Menu 🍕</Heading>
            <Row className="justify-content-center">
                {pizzas.map((pizza) => (
                    <Col key={pizza.id} md={4} className="mb-4">
                        <PizzaCard>
                            <Carousel>
                                {pizza.images.map((image, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                            className="d-block w-100"
                                            src={image}
                                            alt={pizza.name}
                                            style={{ height: '250px', objectFit: 'cover' }}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                            <Card.Body className="text-center">
                                <Card.Title className="font-weight-bold">{pizza.name}</Card.Title>
                                <Description>{pizza.description}</Description>
                                <PriceText>
                                    Prices:<br />
                                    (Small): ${pizza.prices.small.toFixed(2)}<br />
                                    (Large): ${pizza.prices.large.toFixed(2)}<br />
                                    (Extra Large): ${pizza.prices.extraLarge.toFixed(2)}
                                </PriceText>
                                <Form.Group controlId={`pizza-size-${pizza.id}`}>
                                    <Form.Label>Select Size:</Form.Label>
                                    <Form.Control as="select" defaultValue="small">
                                        <option value="small">Small</option>
                                        <option value="large">Large</option>
                                        <option value="extraLarge">Extra Large</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId={`quantity-${pizza.id}`}>
                                    <Form.Label>Quantity:</Form.Label>
                                    <Form.Control type="number" defaultValue="1" min="1" />
                                </Form.Group>
                                <StyledButton
                                    onClick={() => {
                                        const size = document.getElementById(`pizza-size-${pizza.id}`).value;
                                        const quantity = parseInt(document.getElementById(`quantity-${pizza.id}`).value);
                                        addToCart(pizza, size, quantity);
                                    }}
                                >
                                    Add to Cart
                                </StyledButton>
                            </Card.Body>
                        </PizzaCard>
                    </Col>
                ))}
            </Row>
        </StyledContainer>
    );
}

export default Pizza;
