import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import {Button, Input, Form} from 'react-bootstrap';



export const LoginScreen = () => {


    return (
        <body style={{backgroundColor: "rgb(21,32,43)"}}> 
            <div className="container">
                <header style={{color: "rgb(255, 122, 0)", fontSize:"200%"}}>
                    Login to Social App
                </header>
                <div style={{
                    display: "flex", alignItems: "center", color: "rgb(150, 150, 150)",
                    flexDirection: "column" }}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{color: "rgb(150, 150, 150)"}}>Username</Form.Label>
                        <Form.Control style={{backgroundColor: "rgb(21,32,43)", borderColor: "#ff7a00" }} type="text" placeholder="Enter username"/>
                       
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{color: "rgb(150, 150, 150)"}}>Password</Form.Label>
                        <Form.Control style={{backgroundColor: "rgb(21,32,43)", borderColor: "#ff7a00", borderInlineColor: "#ff7a00"}} type="password" placeholder="Password" />
                    </Form.Group >
                    <Link to="/">
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