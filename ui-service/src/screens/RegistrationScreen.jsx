import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import {Button, Input, Form} from 'react-bootstrap';



export const RegistrationScreen = () => {


    return (
        <body style={{backgroundColor: "rgb(21,32,43)"}}> 
            <div className="container">
                <header style={{color: "rgb(255, 122, 0)", fontSize:"200%"}}>
                    Register with whatever this app is called
                </header>
                <div style={{
                    display: "flex", alignItems: "center", color: "rgb(150, 150, 150)",
                    flexDirection: "column" }}>
                    <p style={{fontWeight: "bold"}}>Register below by entering an ID and password</p>     
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{color: "rgb(150, 150, 150)"}}>Email address</Form.Label>
                        <Form.Control style={{backgroundColor: "rgb(21,32,43)", borderColor: "#ff7a00" }} type="email" placeholder="Enter email"/>
                       
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{color: "rgb(150, 150, 150)"}}>Password</Form.Label>
                        <Form.Control style={{backgroundColor: "rgb(21,32,43)", borderColor: "#ff7a00", borderInlineColor: "#ff7a00"}} type="password" placeholder="Password" />
                    </Form.Group >
                    <Link to="/Login">
                        <Button className="Buttons" variant="primary" type="submit">
                            Login
                        </Button>
                    </Link>
                   
                    </Form>
                </div>

            </div>
        </body>
        
    )




}