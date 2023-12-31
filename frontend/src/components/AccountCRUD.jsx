import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import routesPaths from '../router-config/routes-paths';
import { useNavigate } from 'react-router-dom';


const AccountCreationModal = ({ showModal, handleClose }) => {
  const [name, setName] = useState('');
  const [cnic, setCnic] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [images, setImages] = useState(null);
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  const resetStates = () => {
    setName('');
    setCnic('');
    setUsername('');
    setPassword('');
    setImages(null);
    setBalance(0);
  }

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('cnic', cnic);
      formData.append('username', username);
      formData.append('password', password);
      formData.append('balance' , balance)

      // Append each selected image to  the FormData
      if (images) {
        for (let i = 0; i < images.length; i++) {
          formData.append('images', images[i]);
        }
      }

      const userDetails = JSON.parse(Cookies.get('userBankingApp'));

      const config = {
        headers: { Authorization: `Bearer ${userDetails.token}` },
      };

      // console.log(formData)

      // Make a fetch request to send the data to the backend
      const response = await axios.post('http://localhost:3005/account', formData, config);
      if (response.status === 201) {
        alert('Account created successfully');
        resetStates();
        window.location.reload();
        handleClose(); // Close the modal after creating an account
      } else {
        console.error('Error creating account');
      }
    } catch (error) {
      alert('Error creating account:'+ error.message);
    }
  };

  const handleGeneratePassword = () => {
    // Implement your password generation logic here (replace with a secure method in production)
    const PASSWORD_LENGTH = 14;
    const generatedPassword = Math.random().toString(36).substring(7);
    setPassword(generatedPassword);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setImages(files);
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form encType='multipart/form-data' onSubmit={handleCreateAccount}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formCNIC">
            <Form.Label>CNIC</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter CNIC"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password (Autogenerated)</Form.Label>
            <div className="input-group">
              <Form.Control
                type="text"
                className="form-control"
                value={password}
                readOnly
              />
              <Button variant="primary" onClick={handleGeneratePassword}>
                Generate Password
              </Button>
            </div>
            <small className="text-muted">Password will be autogenerated.</small>
          </Form.Group>
          {/* Add upload images fields */}
          <Form.Group controlId="formImages">
            <Form.Label>Images</Form.Label>
            <Form.Control
              type="file"
              placeholder="Select images"
              name="images"
              multiple
              accept='image/*'
              onChange={handleFileChange}
            />
          </Form.Group>
          <Form.Group controlId="formBalance">
            <Form.Label>Balance</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter balance"
              name="balance"
              value={balance}
              onChange={(e)=>{
                setBalance(e.target.value)
              }}
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type='submit'>
              Create Account
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const AccountTable = () => {
  const [accounts, setAccounts] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [toUpdateAccount, setToUpdateAccount] = useState(null);
  

  const getDataFromBackend = async () => {
    try {
      const userDetails = JSON.parse(Cookies.get('userBankingApp'));

      const config = {
        headers: { Authorization: `Bearer ${userDetails.token}` },
      };
      const bodyParameters = {};

      const response = await axios.get(`http://localhost:3005/account`, config);

      if (response.data) {
        setAccounts(response.data);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    getDataFromBackend();
  }, []);


  const handleUpdateAccount = async(id) => {
    const userDetails = JSON.parse(Cookies.get('userBankingApp'));

    const config = {
      headers: { Authorization: `Bearer ${userDetails.token}` },
    };

    /* const accountToBeEdited = accounts.filter((account) => account._id === id);
    console.log(accountToBeEdited) */

    if(toUpdateAccount){
      const bodyParameters = {
        _id: id,
        name: toUpdateAccount.name,
        cnic: toUpdateAccount.cnic,
        balance: toUpdateAccount.balance,
      };
      const response = await axios.post('http://localhost:3005/account/update', bodyParameters, config);
    
      getDataFromBackend();
    }
    /* console.log('Updating account:', id, updatedData); */

    // Reset the edit mode
    setEditMode(null);
    setUpdatedData({});

    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account._id === id ? { ...account, ...updatedData } : account
      )
    );
  };

  const handleDeleteAccount = async (id) => {
    // Implement your delete account logic here (e.g., send delete request to the backend)
    const userDetails = JSON.parse(Cookies.get('userBankingApp'));

    const config = {
      headers: { Authorization: `Bearer ${userDetails.token}` },
    };

    /* const accountToBeEdited = accounts.filter((account) => account._id === id);
    console.log(accountToBeEdited) */

    
    const bodyParameters = {
      _id: id
    }
    const response = await axios.post('http://localhost:3005/account/delete', bodyParameters, config);
  
    getDataFromBackend();
    
    /* console.log('Updating account:', id, updatedData); */

    // Reset the edit mode
    setEditMode(null);
    setUpdatedData({});

    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account._id === id ? { ...account, ...updatedData } : account
      )
    );
  };

  const handleEditChange = (key, value) => {
    // Update the corresponding property in toUpdateAccount
    setToUpdateAccount((prevData) => ({ ...prevData, [key]: value }));
  };

  // Function to handle clicking the "Edit" button
  const handleEditClick = (id) => {
    // Find the account with the given id
    const accountToEdit = accounts.find((account) => account._id === id);

    // Set toUpdateAccount state to the account data
    setToUpdateAccount(accountToEdit);

    // Set the edit mode
    setEditMode(id);
  };

  // Function to handle clicking the "Cancel" button
  const handleCancelClick = () => {
    // Reset state variables
    setEditMode(null);
    setUpdatedData({});
    setToUpdateAccount(null);
  };

  // Define the columns to display (excluding 'id' and 'password')
  const columnsToDisplay = ['name', 'cnic', 'username', 'balance'];

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {columnsToDisplay.map((column) => (
            <th key={column}>{column.charAt(0).toUpperCase() + column.slice(1)}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((account) => (
          <tr key={account._id}>
            {columnsToDisplay.map((key) => (
              <td key={key}>
                {editMode === account._id ? (
                  <Form.Control
                    type="text"
                    value={toUpdateAccount ? toUpdateAccount[key] : ''}
                    onChange={(e) => handleEditChange(key, e.target.value)}
                  />
                ) : (
                  account[key]
                )}
              </td>
            ))}
            <td>
              {editMode === account._id ? (
                <div>
                  <Button variant="success" size="sm" onClick={() => handleUpdateAccount(account._id)}>
                    Save
                  </Button>{' '}
                  <Button variant="secondary" size="sm" onClick={handleCancelClick}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <div>
                  <Button variant="primary" size="sm" onClick={() => handleEditClick(account._id)}>
                    Edit
                  </Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => handleDeleteAccount(account._id)}>
                    Delete
                  </Button>
                </div>
              )}
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
    <Container className='bs mt-5'>
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
