import React, { useState } from 'react'
import { Col, Form } from 'react-bootstrap'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import * as yup from 'yup'
import { useFormik } from 'formik'
import Typography from '@mui/material/Typography';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';

//schema for the forgotpassword

const forgotSchema = yup.object({
  email: yup.string().required("* required").min(15, 'minimum 15 characters required'),


})

function Forgotpassword() {


  const [error, setError] = useState()
  const [message, setMessage] = useState()

  //here is the formik  validatieon

  const { handleSubmit, handleChange, values, handleBlur, touched, errors } = useFormik({
    initialValues: {
      email: "",


    },
    validationSchema: forgotSchema,
    onSubmit: (user) => {

      handleClick(user)
    }

  })


  //function for forgot password 
  
  async function handleClick(user) {



    const response = await fetch("https://urlshortener-task.onrender.com/api/forgot/password", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json"
      }

    })



    const data = await response.json()
    console.log(data)
    if (data.error) {
      setError(data.error)
    }
    else if (data.message) {

      alert(data.message)
    }



  }

  return (
    <>
      <Row>
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand href="/" style={{ marginLeft: "20px", fontWeight: "bolder" }}>SHORTY</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />




          </Container>
        </Navbar>
      </Row>




      <Row
        sm={1} md={1} xs={1} lg={1}>
        <Col style={{ width: "100%", display: "grid", placeItems: "center", textAlign: "center" }} >
          <Card style={{
            marginTop: '100px'
            , width: "50%", textAlign: "center"
          }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" style={{ fontWeight: "bolder" }}>
                Forgot password
              </Typography>
              <Form onSubmit={handleSubmit}>

                <TextField style={{ marginTop: "10px", width: "100%" }}
                  id="outlined-basic" label="email" variant="outlined"

                  type="email"
                  placeholder="Example:johndue@gmail.com"
                  value={values.email}
                  name='email'
                  onBlur={handleBlur}
                  onChange={handleChange} />

                <Typography style={{ color: "crimson" }}>
                  {touched.email ? errors.email : ""}
                </Typography>


                {error ?
                  <Form.Control style={{
                    margin: "10px",
                    Color: "crimson"
                    , fontWeight: "bold", textAlign: "center"
                  }}
                    placeHolder={error} /> : " "}


                <Button variant="contained" type='submit' style={{ margin: "5px" }}>submit</Button>
              </Form>
            </CardContent>
          </Card>
        </Col>



      </Row>
    </>

  )
}

export default Forgotpassword