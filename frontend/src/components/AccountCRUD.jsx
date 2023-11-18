import React, { useState } from 'react';
import { Button, Modal, Table, Form, Container, Row, Col } from 'react-bootstrap';

const AccountCreationModal = ({ showModal, handleClose }) => {
  const [accountData, setAccountData] = useState({
    name: '',
    cnic: '',
    username: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreateAccount = () => {
    // Implement your create account logic here
    console.log('Creating account:', accountData);
    handleClose(); // Close the modal after creating an account
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={accountData.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formCNIC">
            <Form.Label>CNIC</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter CNIC"
              name="cnic"
              value={accountData.cnic}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={accountData.username}
              onChange={handleInputChange}
            />
          </Form.Group>
          {/* Add upload images fields */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreateAccount}>
          Create Account
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const AccountTable = () => {
  const [accounts, setAccounts] = useState([
    // Initialize with some sample data
    { id: 1, name: 'John Doe', cnic: '1234567890123', username: 'john_doe', password: '5uj66' },
    // Add more accounts as needed
  ]);

  const handleUpdateAccount = (id, updatedData) => {
    // Implement your update account logic here
    console.log('Updating account:', id, updatedData);
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) => (account.id === id ? { ...account, ...updatedData } : account))
    );
  };

  const handleDeleteAccount = (id) => {
    // Implement your delete account logic here
    console.log('Deleting account:', id);
    setAccounts((prevAccounts) => prevAccounts.filter((account) => account.id !== id));
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>CNIC</th>
          <th>Username</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((account) => (
          <tr key={account.id}>
            <td>{account.name}</td>
            <td>{account.cnic}</td>
            <td>{account.username}</td>
            <td>
              <Button variant="primary" size="sm" onClick={() => handleUpdateAccount(account.id, { name: 'Updated' })}>
                Update
              </Button>{' '}
              <Button variant="danger" size="sm" onClick={() => handleDeleteAccount(account.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const AccountCRUD = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <Container>
        <h1 className='mt-2 mb-2 p-1'>Account Management</h1>
      <Row>
        <Col>
          <Button className='mt-3 mb-3' variant="primary" onClick={handleShow}>
            Create Account
          </Button>
          <AccountCreationModal showModal={showModal} handleClose={handleClose} />
        </Col>
      </Row>
      <Row>
        <Col>
          <AccountTable />
        </Col>
      </Row>
    </Container>
  );
};

export default AccountCRUD;
