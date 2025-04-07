import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button, Form, Modal, Badge, Nav, Tab, Alert } from "react-bootstrap";
import {
  FaUsers,
  FaShoppingCart,
  FaPizzaSlice,
  FaChartLine,
  FaEdit,
  FaTrash,
  FaPlus,
  FaCheck,
  FaTimes,
  FaBoxOpen,
  FaUserPlus,
  FaMoneyBillWave,
  FaClock,
  FaStar,
  FaChartBar,
  FaChartPie,
} from "react-icons/fa";
import styled, { keyframes } from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const DashboardContainer = styled(Container)`
  padding: 20px;
  margin-top: 20px;
`;

const DashboardCard = styled(Card)`
  border-radius: 15px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  margin-bottom: 20px;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CardHeader = styled(Card.Header)`
  background: linear-gradient(45deg, #ff4b2b, #ff416c);
  color: white;
  border-radius: 15px 15px 0 0 !important;
  padding: 15px 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StatCard = styled(DashboardCard)`
  background: white;
  
  .stat-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
    margin: 10px 0;
  }
  
  .stat-label {
    color: #666;
    font-size: 1.1rem;
  }
  
  .stat-icon {
    font-size: 2rem;
    color: #ff4b2b;
    margin-bottom: 10px;
  }
`;

const StyledTable = styled(Table)`
  margin-bottom: 0;
  
  th {
    background: #f8f9fa;
    border-bottom: 2px solid #dee2e6;
    color: #2c3e50;
    font-weight: 600;
  }
  
  td {
    vertical-align: middle;
  }
  
  tr:hover {
    background: #f8f9fa;
  }
`;

const ActionButton = styled(Button)`
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 5px;
  font-size: 0.9rem;
  
  &.edit-btn {
    background: #4CAF50;
    border: none;
    
    &:hover {
      background: #45a049;
    }
  }
  
  &.delete-btn {
    background: #f44336;
    border: none;
    
    &:hover {
      background: #da190b;
    }
  }
`;

const StatusBadge = styled(Badge)`
  padding: 8px 12px;
  font-size: 0.9rem;
  font-weight: 500;
  
  &.pending {
    background: #ff9800;
  }
  
  &.processing {
    background: #2196F3;
  }
  
  &.completed {
    background: #4CAF50;
  }
  
  &.cancelled {
    background: #f44336;
  }
`;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalMenuItems: 0,
    recentOrders: [],
    popularItems: []
  });
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all dashboard data
      const [ordersResponse, pizzasResponse, dessertsResponse, sidesResponse, usersResponse] = await Promise.all([
        fetch("http://localhost:5000/orders"),
        fetch("http://localhost:5000/menu"),
        fetch("http://localhost:5000/desserts"),
        fetch("http://localhost:5000/side"),
        fetch("http://localhost:5000/users")
      ]);

      if (!ordersResponse.ok || !pizzasResponse.ok || !dessertsResponse.ok || !sidesResponse.ok || !usersResponse.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const [ordersData, pizzasData, dessertsData, sidesData, usersData] = await Promise.all([
        ordersResponse.json(),
        pizzasResponse.json(),
        dessertsResponse.json(),
        sidesResponse.json(),
        usersResponse.json()
      ]);

      // Calculate statistics
      const totalRevenue = ordersData.reduce((sum, order) => sum + order.total_price, 0);
      
      // Combine menu items
      const menuItems = [
        ...pizzasData.map(item => ({ ...item, category: 'pizza' })),
        ...dessertsData.map(item => ({ ...item, category: 'dessert' })),
        ...sidesData.map(item => ({ ...item, category: 'side' }))
      ];

      setStats({
        totalOrders: ordersData.length,
        totalRevenue,
        totalCustomers: usersData.length,
        totalMenuItems: menuItems.length,
        recentOrders: ordersData.slice(0, 5),
        popularItems: menuItems.slice(0, 5)
      });

      setOrders(ordersData);
      setMenuItems(menuItems);
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data. Please try again later.");
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      let endpoint = "";
      switch (formData.category) {
        case "pizza":
          endpoint = "http://localhost:5000/add/pizza";
          formDataToSend.append("small_price", formData.price);
          formDataToSend.append("large_price", formData.price * 1.5);
          formDataToSend.append("extra_large_price", formData.price * 2);
          break;
        case "dessert":
          endpoint = "http://localhost:5000/add/desserts";
          break;
        case "side":
          endpoint = "http://localhost:5000/add/side";
          formDataToSend.append("small_price", formData.price);
          formDataToSend.append("large_price", formData.price * 1.5);
          break;
        default:
          throw new Error("Invalid category");
      }

      const response = await fetch(endpoint, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to add menu item");
      }

      toast.success("Menu item added successfully");
      setShowAddModal(false);
      fetchDashboardData();
    } catch (error) {
      console.error("Error adding menu item:", error);
      toast.error("Failed to add menu item");
    }
  };

  const handleEditItem = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await fetch(`http://localhost:5000/api/admin/menu/${selectedItem.id}?category=${selectedItem.category}`, {
        method: "PUT",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to update menu item");
      }

      toast.success("Menu item updated successfully");
      setShowEditModal(false);
      fetchDashboardData();
    } catch (error) {
      console.error("Error updating menu item:", error);
      toast.error("Failed to update menu item");
    }
  };

  const handleDeleteItem = async (id, category) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/menu/${id}?category=${category}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete menu item");
        }

        toast.success("Menu item deleted successfully");
        fetchDashboardData();
      } catch (error) {
        console.error("Error deleting menu item:", error);
        toast.error("Failed to delete menu item");
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      toast.success("Order status updated successfully");
      fetchDashboardData();
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  if (loading) {
    return (
      <DashboardContainer fluid>
        <div className="text-center py-5">
          <CircularProgress />
          <p className="mt-3">Loading dashboard data...</p>
        </div>
      </DashboardContainer>
    );
  }

  if (error) {
    return (
      <DashboardContainer fluid>
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer fluid>
      <Row className="mb-4">
        <Col>
          <h2 className="mb-0">Admin Dashboard</h2>
          <p className="text-muted">Manage your restaurant operations</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={3}>
          <StatCard>
            <Card.Body className="text-center">
              <FaShoppingCart className="stat-icon" />
              <div className="stat-value">{stats.totalOrders}</div>
              <div className="stat-label">Total Orders</div>
            </Card.Body>
          </StatCard>
        </Col>
        <Col md={3}>
          <StatCard>
            <Card.Body className="text-center">
              <FaMoneyBillWave className="stat-icon" />
              <div className="stat-value">${stats.totalRevenue.toFixed(2)}</div>
              <div className="stat-label">Total Revenue</div>
            </Card.Body>
          </StatCard>
        </Col>
        <Col md={3}>
          <StatCard>
            <Card.Body className="text-center">
              <FaUsers className="stat-icon" />
              <div className="stat-value">{stats.totalCustomers}</div>
              <div className="stat-label">Total Customers</div>
            </Card.Body>
          </StatCard>
        </Col>
        <Col md={3}>
          <StatCard>
            <Card.Body className="text-center">
              <FaPizzaSlice className="stat-icon" />
              <div className="stat-value">{stats.totalMenuItems}</div>
              <div className="stat-label">Menu Items</div>
            </Card.Body>
          </StatCard>
        </Col>
      </Row>

      <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
        <Row>
          <Col md={3}>
            <Card>
              <Card.Body className="p-0">
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="overview">
                      <FaChartLine className="me-2" /> Overview
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="orders">
                      <FaShoppingCart className="me-2" /> Orders
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="menu">
                      <FaPizzaSlice className="me-2" /> Menu
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="users">
                      <FaUsers className="me-2" /> Users
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>

          <Col md={9}>
            <Tab.Content>
              <Tab.Pane eventKey="overview">
                <DashboardCard>
                  <CardHeader>
                    <FaChartBar className="me-2" /> Overview
                  </CardHeader>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <h5>Recent Orders</h5>
                        <StyledTable striped hover>
                          <thead>
                            <tr>
                              <th>Order ID</th>
                              <th>Items</th>
                              <th>Amount</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {stats.recentOrders.map((order) => (
                              <tr key={order.order_id}>
                                <td>#{order.order_id}</td>
                                <td>{order.item_name}</td>
                                <td>${order.total_price.toFixed(2)}</td>
                                <td>
                                  <StatusBadge className={order.status.toLowerCase()}>
                                    {order.status}
                                  </StatusBadge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </StyledTable>
                      </Col>
                      <Col md={6}>
                        <h5>Popular Items</h5>
                        <StyledTable striped hover>
                          <thead>
                            <tr>
                              <th>Item</th>
                              <th>Category</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {stats.popularItems.map((item) => (
                              <tr key={`${item.category}-${item.id}`}>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>
                                  {item.category === 'pizza' ? (
                                    <>
                                      Small: ${item.small_price}<br />
                                      Large: ${item.large_price}<br />
                                      XL: ${item.extra_large_price}
                                    </>
                                  ) : item.category === 'side' ? (
                                    <>
                                      Small: ${item.small_price}<br />
                                      Large: ${item.large_price}
                                    </>
                                  ) : (
                                    `$${item.price}`
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </StyledTable>
                      </Col>
                    </Row>
                  </Card.Body>
                </DashboardCard>
              </Tab.Pane>

              <Tab.Pane eventKey="orders">
                <DashboardCard>
                  <CardHeader>
                    <FaShoppingCart className="me-2" /> Orders
                  </CardHeader>
                  <Card.Body>
                    <StyledTable striped hover>
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Item</th>
                          <th>Category</th>
                          <th>Size</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.order_id}>
                            <td>#{order.order_id}</td>
                            <td>{order.item_name}</td>
                            <td>{order.category}</td>
                            <td>{order.size}</td>
                            <td>${order.total_price.toFixed(2)}</td>
                            <td>
                              <StatusBadge className={order.status.toLowerCase()}>
                                {order.status}
                              </StatusBadge>
                            </td>
                            <td>{new Date(order.order_date).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </StyledTable>
                  </Card.Body>
                </DashboardCard>
              </Tab.Pane>

              <Tab.Pane eventKey="menu">
                <DashboardCard>
                  <CardHeader>
                    <FaPizzaSlice className="me-2" /> Menu
                    <Button
                      variant="light"
                      className="ms-auto"
                      onClick={() => setShowAddModal(true)}
                    >
                      <FaPlus className="me-2" /> Add Item
                    </Button>
                  </CardHeader>
                  <Card.Body>
                    <StyledTable striped hover>
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {menuItems.map((item) => (
                          <tr key={`${item.category}-${item.id}`}>
                            <td>
                              <img
                                src={`http://localhost:5000/images/${item.image}`}
                                alt={item.name}
                                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                              />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>
                              {item.category === 'pizza' ? (
                                <>
                                  Small: ${item.small_price}<br />
                                  Large: ${item.large_price}<br />
                                  XL: ${item.extra_large_price}
                                </>
                              ) : item.category === 'side' ? (
                                <>
                                  Small: ${item.small_price}<br />
                                  Large: ${item.large_price}
                                </>
                              ) : (
                                `$${item.price}`
                              )}
                            </td>
                            <td>
                              <ActionButton
                                className="edit-btn"
                                onClick={() => {
                                  setSelectedItem(item);
                                  setFormData({
                                    name: item.name,
                                    description: item.description,
                                    price: item.category === 'pizza' ? item.small_price : 
                                           item.category === 'side' ? item.small_price : 
                                           item.price,
                                    category: item.category,
                                    image: null,
                                  });
                                  setShowEditModal(true);
                                }}
                              >
                                <FaEdit />
                              </ActionButton>
                              <ActionButton
                                className="delete-btn"
                                onClick={() => handleDeleteItem(item.id, item.category)}
                              >
                                <FaTrash />
                              </ActionButton>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </StyledTable>
                  </Card.Body>
                </DashboardCard>
              </Tab.Pane>

              <Tab.Pane eventKey="users">
                <DashboardCard>
                  <CardHeader>
                    <FaUsers className="me-2" /> Users
                  </CardHeader>
                  <Card.Body>
                    <StyledTable striped hover>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Orders</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.orders?.length || 0}</td>
                            <td>
                              <Badge bg={user.status === "active" ? "success" : "danger"}>
                                {user.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </StyledTable>
                  </Card.Body>
                </DashboardCard>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      {/* Add Menu Item Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Menu Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddItem}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="">Select Category</option>
                <option value="pizza">Pizza</option>
                <option value="dessert">Dessert</option>
                <option value="drink">Drink</option>
                <option value="side">Side</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Add Item
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Menu Item Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Menu Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditItem}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="">Select Category</option>
                <option value="pizza">Pizza</option>
                <option value="dessert">Dessert</option>
                <option value="drink">Drink</option>
                <option value="side">Side</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              />
              <small className="text-muted">Leave empty to keep current image</small>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update Item
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <ToastContainer position="bottom-right" />
    </DashboardContainer>
  );
};

export default AdminDashboard; 