import React  from 'react'
import {children} from 'react'
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
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

            <span style={{ marginRight: "20px" }}><Button variant='success' size='md'
              onClick={handleClick} >Logout</Button></span>


          </Container>
        </Navbar>
      </Row>
      <Row>{children}</Row>
    </>
  )
}

export default Base