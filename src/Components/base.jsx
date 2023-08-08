import React  from 'react'
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import {Row,Nav} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

import { useHistory } from 'react-router-dom';
import { Children } from 'react';


function Base({ children }) {
  const history = useHistory()
  function handleClick() {
    localStorage.removeItem("token")
    history.push("/")
  }
  return (
    <>
      <Row>
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand href="/" style={{ marginLeft: "20px", fontWeight: "bolder" }}>SHORTY</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            
            <Navbar.Collapse id="navbarScroll">
            <Button variant='success' size='md' 
            style={{ marginLeft: "80%" }}
              onClick={handleClick} >Logout</Button>
        </Navbar.Collapse>
        
          </Container>
         
        </Navbar>
      </Row>
      <Row>{children}</Row>
    </>
  )
}

export default Base