import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Alert } from "react-bootstrap";
import { useMutation } from 'react-query';   
import { API } from '../../config/api';
import {UserContext} from '../../context/userContext'

function Register({ show, setShow, setShowLogin }) {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    phone : '',
  });

  const { name, email, password,phone} = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //======================

  const [state] = useContext(UserContext)
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Create account
      const response = await API.post("/register", form);
      console.log("ini id user",response.data.data);
      const alert = (
        <Alert variant="success">Successfully registered an account</Alert>
      );

      setMessage(alert);

    } catch (e) {
      console.log(e);
      const alert = (
        <Alert variant="danger">Your Account Failed to Register</Alert>
      );

      setMessage(alert);
    }
  });

  return (
    <>  
      <Modal show={show} onHide={handleClose} centered> 
        <Modal.Header >
          <h2>Register</h2>
        </Modal.Header>
        <Modal.Body>
        {message && message}
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label></Form.Label>
              <Form.Control
                 type="email"
                 placeholder="Email"
                 value={email}
                 name="email"
                 onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label></Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                name="password"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label></Form.Label>
              <Form.Control
                 type="text"
                 placeholder="FullName"
                 value={name}
                 name="fullName"
                 onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label></Form.Label>
              <Form.Control
                 type="number"
                 placeholder="Phone"
                 value={phone}
                 name="phone"
                 onChange={handleChange}
              />
            </Form.Group>
            <button className="btn  btn-lg btn-danger font-weight-bold text-white   btn-fluid w-100" variant="primary" size="md" type='submit' >
            Register</button>
          </Form>
        </Modal.Body>
        
            <div className="text-center mb-3">
                      Already have an account ? <span
                      onClick={() => {
                        setShow(false);
                        setShowLogin(true);
                    }}
                    style={{ cursor: "pointer",fontWeight:"bold",color:"orange"  }}
                    >Login Here</span> 
            </div>
      </Modal>
    </>
  );
}
export default Register;