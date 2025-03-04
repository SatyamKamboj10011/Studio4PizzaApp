import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Invalid email";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = "Invalid phone number";
    if (!formData.address) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit logic here
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <Container fluid className="p-0">
      {/* 🌟 Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">Join the Pizza Revolution! 🍕🎉</h1>
          <p className="hero-subtitle">Create your account to start ordering!</p>
        </div>
      </div>

      {/* 🌟 Registration Form */}
      <Container className="registration-container">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="registration-form p-4 shadow-lg">
              {success && <Alert variant="success" className="animated-alert">Registration successful! Welcome to the pizza family! 🎉</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    required
                    isInvalid={!!errors.name}
                    onChange={handleChange}
                    placeholder="Mario Rossi"
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    required
                    isInvalid={!!errors.email}
                    onChange={handleChange}
                    placeholder="mario@example.com"
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    required
                    isInvalid={!!errors.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                  <div className="password-strength" />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    required
                    isInvalid={!!errors.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                  <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    required
                    isInvalid={!!errors.phone}
                    onChange={handleChange}
                    placeholder="1234567890"
                  />
                  <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    required
                    isInvalid={!!errors.address}
                    onChange={handleChange}
                    placeholder="Enter your full address"
                  />
                  <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                </Form.Group>

                <Button variant="danger" type="submit" className="w-100 hero-button">
                  Create Account 🚀
                </Button>

                <p className="text-center mt-4 auth-switch">
                  Already have an account? <Link to="/login" className="text-gradient">Login here</Link>
                 </p>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      {/* ✨ Enhanced CSS Magic */}
      <style>
        {`
          .hero-section {
            background: linear-gradient(rgba(0, 0, 0, 0.7), url('https://images.unsplash.com/photo-1555072956-7758afb20e8f?q=80&w=1974&auto=format&fit=crop') no-repeat center center fixed;
            background-size: cover;

            min-height: 70vh;
            position: relative;
          }
            

          .hero-overlay {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            width: 100%;
            padding: 20px;
          }

          .hero-title {
            font-size: 3.5rem;
            font-weight: 800;
            letter-spacing: 1.5px;
            margin-bottom: 1.5rem;
            text-shadow: 2px 2px 15px rgba(0, 0, 0, 0.6);
          }

          .hero-subtitle {
            font-size: 1.4rem;
            font-weight: 400;
            max-width: 600px;
            margin: 0 auto;
            text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
          }

          .registration-container {
            position: relative;
            z-index: 2;
            margin-top: -150px;
          }

          .registration-form {
            background: rgba(255, 255, 255, 0.98);
            border-radius: 25px;
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.4);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
            transform: translateY(0);
            animation: slideUp 0.8s cubic-bezier(0.23, 1, 0.32, 1);
          }

          .form-label {
            font-weight: 700;
            color: #2d3436;
            font-family: 'Poppins', sans-serif;
            font-size: 1rem;
            margin-bottom: 10px;
            letter-spacing: 0.5px;
          }

          .form-control {
            border-radius: 12px;
            padding: 16px 24px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 2px solid #e0e0e0;
            background: #f8f9fa;
            font-size: 1rem;
            font-weight: 500;
          }

          .form-control:focus {
            box-shadow: 0 0 0 4px rgba(255, 75, 43, 0.25);
            border-color: #ff4b2b;
            background: white;
          }

          .form-control::placeholder {
            color: #95a5a6;
            font-style: italic;
            font-weight: 400;
          }

          .hero-button {
            background: linear-gradient(45deg, #ff4b2b, #ff416c);
            border: none;
            padding: 18px;
            font-size: 1.2rem;
            font-weight: 700;
            border-radius: 15px;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-top: 1.5rem;
          }

          .hero-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 25px rgba(255, 75, 43, 0.35);
          }

          .animated-alert {
            animation: fadeIn 0.6s ease-out;
            border-radius: 12px;
            backdrop-filter: blur(8px);
            background: rgba(40, 167, 69, 0.95) !important;
            color: white !important;
            border: none;
          }

          .password-strength {
            height: 4px;
            background: #eee;
            border-radius: 2px;
            margin-top: 10px;
            overflow: hidden;
          }

          .password-strength::after {
            content: '';
            display: block;
            height: 100%;
            width: ${(formData.password.length / 12) * 100}%;
            background: ${formData.password.length >= 8 ? '#2ecc71' : '#ff4b2b'};
            transition: all 0.3s ease;
          }

          .auth-switch {
            font-size: 0.95rem;
            color: #636e72;
          }

          .text-gradient {
            background: linear-gradient(45deg, #ff4b2b, #ff416c);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            font-weight: 600;
            text-decoration: none;
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(80px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 768px) {
            .hero-title {
              font-size: 2.5rem;
            }
            
            .hero-subtitle {
              font-size: 1.1rem;
            }
            
            .registration-container {
              margin-top: -100px;
            }
            
            .registration-form {
              margin: 0 15px;
              padding: 25px;
            }
            
            .form-control {
              padding: 14px 20px;
            }
          }

          @media (max-width: 576px) {
            .hero-title {
              font-size: 2rem;
            }
            
            .hero-subtitle {
              font-size: 1rem;
            }
          }
        `}
      </style>
    </Container>
  );
};

export default Registration;