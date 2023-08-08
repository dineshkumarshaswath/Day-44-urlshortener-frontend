import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Base from './base';



function Homepage() {
  const [allurl, setAllurl] = useState([])
  const [posturl, setPosturl] = useState("")
  const [error, setError] = useState("")
  const history = useHistory()
  const token = localStorage.getItem('token')

// api for the get the user URL

  async function gotUrl() {
    const response = await fetch("https://urlshortener-task.onrender.com/api/myurl", {
      method: "GET",
      headers: {
        "x-auth-token": token
      }
    })
    const data = await response.json()

    if (data.allurl) {
      setAllurl(data.allurl)

    }

  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/", { replace: true })
    }
    let token = localStorage.getItem("token")

    async function getUrl() {
      const response = await fetch("https://urlshortener-task.onrender.com/api/myurl", {
        method: "GET",
        headers: {
          "x-auth-token": token
        }
      })
      const data = await response.json()

      if (data.allurl) {
        setAllurl(data.allurl)

      } else {
        setError(data.message)
      }

    }
    getUrl()

  }, [])

  //here is the api for the short the url

  async function handleClick(e) {
    e.preventDefault()
    setError(" ")
    const user = {
      url: posturl
    }


    const response = await fetch("https://urlshortener-task.onrender.com/api/post/url", {
      method: "POST",
      body: JSON.stringify(user),

      headers: {
        "content-type": "application/json",
        "x-auth-token": token
      }
    })

    const data = await response.json()
    if (data.message == "successfully created") {

      gotUrl()
      alert("successfully created")
    } else {
      setError(data.message)
    }

  }

// api for the delete the url

  async function handleDelete(id) {
    const response = await fetch(`https://urlshortener-task.onrender.com/api/delete/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "x-auth-token": token
      }
    })
    const data = await response.json()
    if (data.message == "successfully the  delete the shorten url") {
      const filterUrl = allurl.filter((url, idx) => url._id != id)
      setAllurl(filterUrl)
      alert("successfully deleted")
    } else {
      console.log(data.message)
    }


  }



  return (


    <Base>
      <Row xs={1} sm={1} md={1} lg={1} style={{ textAlign: "center" ,width:"100%"}}   >
        <Col> <Form style={{
          display: "grid", placeItems: "center",
          margin: "20px", borderRadius: "10px"
        }}>
          <Form.Label style={{ fontWeight: 'bolder' }}>Post Your Url here</Form.Label>
          <Form.Control value={posturl} style={{ width: "80%" }} type='text'
            onChange={(e) => setPosturl(e.target.value)} />
        </Form></Col>
        <Col><div style={{ color: "crimson", margin: "5px" }}>{error}</div></Col>
        <Col><Button variant="success"
          onClick={handleClick}>short</Button></Col>
      </Row>

      <Row style={{ padding: "30px" }}>

        {allurl.length > 0 ? <Table striped bordered hover variant="secondary" responsive >
          <thead >
            <tr>
              <th  >S.No</th>
              <th>longUrl</th>
              <th>shortUrl</th>
              <th>clicks</th>

              <th>Delete</th>

            </tr>
          </thead>
          <tbody>
            {allurl.map((urls, idx) => {

              return (

                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td><a href={urls.redirectURL} style={{ textDecoration: "none" }}>{urls.redirectURL} </a></td>
                  <td><a href={`http://urlshortener-task.onrender.com/api/redirect/${urls.shortId}`} target="_blank" style={{ textDecoration: "none" }}>
                    {urls.shortId}</a></td>
                  <td>{urls.clicks.length}</td>
                  <td> <Button onClick={() => handleDelete(urls._id)} variant="danger" size="sm">Delete</Button></td>


                </tr>)
            })}
          </tbody>
        </Table> : <div style={{ textAlign: "center" }}>You haven't posted any url here...</div>}

      </Row>
    </Base>

  )
}

export default Homepage

