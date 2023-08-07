import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react'
import { Button, Col, } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import * as yup from 'yup'
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField';

// Schema for the user login

const loginSchema = yup.object({
    email: yup.string().required("* required").min(10, 'minimum 10 characters required'),
    password: yup.string().required("* required")

})



function Login() {

    const [error, setError] = useState("")
    const history = useHistory()

// formik validation for the user

    const { handleSubmit, handleChange, values, handleBlur, touched, errors } = useFormik({
        initialValues: {
            email: "",
            password: "",

        },
        validationSchema: loginSchema,
        onSubmit: (loginUser) => {

            loginFunction(loginUser)
        }

    })
//api for the login function 

    async function loginFunction(loginUser) {

        setError("")

        const response = await fetch("https://urlshortener-task.onrender.com/api/login", {
            method: "POST",
            body: JSON.stringify(loginUser),
            headers: {
                "content-type": "application/json"
            }


        })
        const data = await response.json()

        if (data.token) {

            localStorage.setItem("token", data.token)
            history.push("/home")

        }
        else {

            setError(data.message)
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



            <Row sm={1} md={1} lg={1} xl={1}
                style={{ textAlign: "center", width: "100%" }}>

                <Form onSubmit={handleSubmit}
                    style={{ display: "grid", placeItems: "center", marginTop: "70px", }}
                >

                    <Col style={{ textAlign: "center", width: '100%', margin: "5px" }}  >

                        <TextField id="filled-basic" label="Email" variant="filled" style={{ textAlign: "center", borderRadius: "20px" }}
                            type="email"
                            placeholder="Example:johndue@gmail.com"
                            value={values.email}
                            name='email'
                            onBlur={handleBlur}
                            onChange={handleChange} /> </Col>

                    <Col style={{ color: 'crimson', textAlign: "center", width: '100%', margin: "5px" }}>
                        {touched.email ? errors.email : ""}</Col>

                    <Col><a href="/forgot" style={{ textDecoration: 'none' }}>forgotpassword?</a></Col>

                    <Col style={{ textAlign: "center", width: '100%', margin: "5px" }} variant="success" >

                        <TextField id="filled-basic" label="password" variant="filled" type="password" placeholder="Your Password"
                            style={{ textAlign: "center", borderRadius: "20px" }}
                            value={values.password}
                            name='password'
                            onBlur={handleBlur}
                            onChange={handleChange}
                        /> </Col>

                    <Col style={{ color: 'crimson', textAlign: "center", width: '100%', margin: "5px" }}>
                        {touched.password ? errors.password : ""}</Col>


                    <Col style={{ margin: "5px" }}><Button type='submit' variant="success" size="sm">Login</Button>
                    </Col>


                    {error ? <Col style={{
                        textAlign: "center",
                        width: '100%', margin: "5px", color: 'crimson'
                    }}
                    >{error}</Col> : " "}


                </Form>

                <Col >Don't have account?<a href='/signup' >Sign in</a>

                </Col>

            </Row>

        </>
    )
}

export default Login