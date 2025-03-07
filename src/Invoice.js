import React from "react";
import { Container, Card, Button, Table } from "react-bootstrap";
import { jsPDF } from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";

const Invoice = () => {
  const location = useLocation();
  const { cart, customer } = location.state || { cart: [], customer: {} };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Pizza Order Invoice", 20, 20);
    doc.setFontSize(12);

    let yPosition = 40;
    doc.text(`Customer Name: ${customer.name}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Email: ${customer.email}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Phone: ${customer.phone}`, 20, yPosition);
    yPosition += 10;

    doc.text("Order Summary:", 20, yPosition);
    yPosition += 10;

    cart.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.quantity} x ${item.pizza} (${item.size}) - $${item.totalPrice.toFixed(2)}`,
        20,
        yPosition
      );
      yPosition += 10;
    });

    const totalAmount = cart.reduce((acc, item) => acc + item.totalPrice, 0);
    doc.text(`Total: $${totalAmount.toFixed(2)}`, 20, yPosition + 10);

    doc.save("invoice.pdf");
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f9f9f9",
    },
    card: {
      maxWidth: "750px",
      width: "100%",
      padding: "30px",
      background: "white",
      borderRadius: "15px",
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
    },
    title: {
      textAlign: "center",
      color: "#FFA500",
      fontWeight: "bold",
      fontSize: "2rem",
      marginBottom: "20px",
    },
    customerInfo: {
      background: "#FFF3E0",
      padding: "15px",
      borderRadius: "10px",
      marginBottom: "20px",
    },
    table: {
      borderColor: "#FFA500",
    },
    totalPrice: {
      textAlign: "right",
      fontSize: "1.2rem",
      fontWeight: "bold",
      marginTop: "20px",
      color: "#28a745",
    },
    buttonContainer: {
      textAlign: "center",
      marginTop: "20px",
    },
    button: {
      padding: "12px 20px",
      fontSize: "1.1rem",
      fontWeight: "bold",
      background: "#FFA500",
      border: "none",
      color: "white",
      borderRadius: "8px",
      cursor: "pointer",
    },
  };

  return (
    <Container style={styles.container}>
      <Card style={styles.card}>
        <h2 style={styles.title}>Invoice</h2>
        <div style={styles.customerInfo}>
          <p><strong>Customer:</strong> {customer.name}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
        </div>

        <Table striped bordered hover responsive style={styles.table}>
          <thead>
            <tr style={{ backgroundColor: "#FFA500", color: "white" }}>
              <th>#</th>
              <th>Pizza</th>
              <th>Size</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.pizza}</td>
                <td>{item.size}</td>
                <td>{item.quantity}</td>
                <td>${item.totalPrice.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <h4 style={styles.totalPrice}>Total: ${cart.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2)}</h4>

        <div style={styles.buttonContainer}>
          <Button style={styles.button} onClick={generatePDF}>
            Download Invoice
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default Invoice;
