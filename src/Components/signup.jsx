import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react'
import { Button, Col } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import * as yup from 'yup'
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField';

//Schema for the signup the user

const singinSchema = yup.object({
   name: yup.string().required("* required").min(7, "minimum 7 characters required"),
   email: yup.string().required("* required").min(15, "minimum 15 characters required"),
   contact: yup.string().required("* required").min(10, "minimum 10 characters required").
      max(10, "maximum 10 characters required"),
   password: yup.string().required("* required").min(10, " 10 character required, Must contain all uppercase and lowercase")
})

function Signup() {
   const history = useHistory()
   const [error, setError] = useState("")

   //  formik validation part 

   const { handleSubmit, handleChange, values, handleBlur, touched, errors } = useFormik({
      initialValues: {
         name: "",
         email: "",
         password: "",
         contact: ""

      },
      validationSchema: singinSchema,
      onSubmit: (signinUser) => {
         console.log(signinUser)
         signupUser(signinUser)
      }

   })

   //api for the create the user

   async function signupUser(signinUser) {


      const response = await fetch("https://urlshortener-task.onrender.com/api/signup", {
         method: "POST",
         body: JSON.stringify(signinUser),
         headers: {
            "content-type": "application/json"
         }
      })

      const data = await response.json()
      if (data.token) {

         localStorage.setItem("token", data.token)
         history.push("/")
      }
      else (
         setError(data.message)
      )

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



         <Row sm={1} md={1} lg={1}
            style={{ textAlign: 'center', }}>
            <Form onSubmit={handleSubmit}
               style={{ display: "grid", placeItems: "center", marginTop: "70px" }}
            >
               <Col style={{ textAlign: "center", width: '30%', margin: "7px" }} variant="success"  >

                  <TextField id="filled-basic"
                     label="Name" variant="filled" type="text" placeholder="Your name" style={{
                        textAlign: "center",
                        borderRadius: "20px"
                     }}
                     value={values.name}
                     onBlur={handleBlur}
                     name='name'
                     onChange={handleChange}
                  />

               </Col>
               <Col style={{ color: 'crimson', textAlign: "center", width: '30%', margin: "1px" }}>
                  {touched.name ? errors.name : ""}</Col>

               <Col style={{ textAlign: "center", width: '30%', margin: "7px" }} variant="success" >

                  <TextField id="filled-basic"
                     label="Email" variant="filled"
                     type="email" placeholder="Example:john@gmail.com" style={{
                        textAlign: "center",
                        borderRadius: "20px"
                     }}
                     value={values.email}
                     onBlur={handleBlur}
                     name="email"
                     onChange={handleChange}
                  />

               </Col>
               <Col style={{ color: 'crimson', textAlign: "center", width: '30%', margin: "1px", }}>
                  {touched.email ? errors.email : ""}</Col>

               <Col style={{ textAlign: "center", width: '30%', margin: "7px" }} variant="success" >

                  <TextField id="filled-basic"
                     label="Contact" variant="filled" type="number" placeholder="Enter phone No"
                     style={{ textAlign: "center", borderRadius: "20px" }}
                     value={values.contact}
                     onBlur={handleBlur}
                     name="contact"

                     onChange={handleChange}
                  />

               </Col>
               <Col style={{ color: 'crimson', textAlign: "center", width: '30%', margin: "1px" }}>
                  {touched.contact ? errors.contact : ""}</Col>

               <Col style={{ textAlign: "center", width: '30%', margin: "7px" }} variant="success"  >

                  <TextField id="filled-basic"
                     label="password" variant="filled" type="password" placeholder="Password"
                     style={{ textAlign: "center", borderRadius: "20px" }}
                     value={values.password}
                     onBlur={handleBlur}
                     onChange={handleChange}
                     name="password"
                  />

               </Col> <Col style={{ color: 'crimson', textAlign: "center", width: '30%', margin: "1px" }}>
                  {touched.password ? errors.password : ""}</Col>

               {error ? <Col style={{ textAlign: "center", width: '30%', margin: "10px" }}
               >{error}</Col> : ""}

               <Col>
                  <Button type='submit' variant="success" size="sm">signup</Button>
               </Col>


            </Form>
         </Row>

      </>
   )
}

export default Signup