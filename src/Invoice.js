import React from "react";
import { Container, Card, Button, Table, Row, Col, Badge } from "react-bootstrap";
import { jsPDF } from "jspdf";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Invoice = () => {
  const location = useLocation();
  const { cart = [], customer = {} } = location.state || {};

  const safeCart = cart.map((item) => ({
    ...item,
    total_price: item.total_price || 0,
    name: item.name || "Unknown Item",
    size: item.size || "Unknown Size",
    quantity: item.quantity || 1,
  }));

  const subtotal = safeCart.reduce((acc, item) => acc + item.total_price, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Pizza Paradise - Invoice", 20, 20);
    doc.setFontSize(12);

    let y = 40;
    doc.text(`Customer Name: ${customer.name || "N/A"}`, 20, y);
    y += 10;
    doc.text(`Phone: ${customer.phone || "N/A"}`, 20, y);
    y += 10;

    doc.text("Order Summary:", 20, y + 10);
    y += 20;

    safeCart.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.quantity} x ${item.name} (${item.size}) - $${item.total_price.toFixed(2)}`, 20, y);
      y += 10;
    });

    y += 10;
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 20, y);
    y += 10;
    doc.text(`Tax (8%): $${tax.toFixed(2)}`, 20, y);
    y += 10;
    doc.text(`Total: $${total.toFixed(2)}`, 20, y + 5);

    doc.save("pizza_invoice.pdf");
  };

  return (
    <Container className="py-5">
      <Card className="shadow-lg border-0">
        <Card.Header
          className="text-white text-center"
          style={{
            background: "linear-gradient(to right, #ff4b2b, #ff416c)",
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem",
          }}
        >
          <h2 className="mb-0 fw-bold">🍕 Pizza Paradise - Invoice</h2>
        </Card.Header>

        <Card.Body>
          <Row className="mb-4">
            <Col md={6}>
              <h5 className="fw-bold">Customer Details</h5>
              <p><strong>Name:</strong> {customer.name || "N/A"}</p>
              <p><strong>Phone:</strong> {customer.phone || "N/A"}</p>
            </Col>
            <Col md={6} className="text-md-end">
              <h5 className="fw-bold">Invoice Date</h5>
              <p>{new Date().toLocaleDateString()}</p>
            </Col>
          </Row>

          <Table responsive bordered hover className="align-middle">
            <thead className="table-warning">
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Size</th>
                <th>Qty</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {safeCart.length > 0 ? (
                safeCart.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.size}</td>
                    <td>{item.quantity}</td>
                    <td>${item.total_price.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-3">
                    No items found in cart.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          <Row className="mt-4">
            <Col md={{ span: 4, offset: 8 }}>
              <div className="d-flex justify-content-between">
                <span>Subtotal:</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
              <div className="d-flex justify-content-between">
                <span>Tax (8%):</span>
                <strong>${tax.toFixed(2)}</strong>
              </div>
              <div className="d-flex justify-content-between">
                <span>Total:</span>
                <h5>
                  <Badge bg="success" className="fs-6">${total.toFixed(2)}</Badge>
                </h5>
              </div>
            </Col>
          </Row>

          <div className="text-center mt-4">
            <Button
              variant="warning"
              size="lg"
              className="px-4 fw-bold"
              onClick={generatePDF}
            >
              📥 Download Invoice (PDF)
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Invoice;
