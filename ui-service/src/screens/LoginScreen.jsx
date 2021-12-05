import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {Button, Input, Form, Image} from 'react-bootstrap';

import { useStoreActions, useStoreState } from 'easy-peasy'

export const LoginUserScreen = () => {

	const logIn = useStoreActions((state) => state.logIn);
	const restHost = useStoreState((state) => state.restHost);
    // console.log(restHost)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    const navigate = useNavigate()

    const handleLogin = async () => {
        try{
            const response = await axios.post(`${restHost}/login/author`, {
                username: username,
                password: password,
            })
            console.log(response.data)

            const authorData = response.data
            logIn({
                ...authorData,
                isAdmin: false,
            })
            navigate("/Posts")
            // window.location.href = "/"
        }
        catch(err){
            console.log("Login Failed. Check your email / password")
            alert(err)
        }
        return

    }

    return (
        <div className="background">
            <div className="container" style={{backgroundColor: "rgb(21,32,43)"}}>
                <header style={{color: "rgb(255, 122, 0)", fontSize:"200%", textAlign: 'center'}}>
                    Login User
                </header>
                <div style={{
                    display: "flex", alignItems: "center", color: "rgb(150, 150, 150)",
                    flexDirection: "column" }}>
                    <p style={{fontWeight: "bold"}}>Enter your info below</p>     
                    <Form>
                        <Form.Group className="mb-3" controlId="formPlaintext">
                        <Form.Label style={{color: "rgb(150, 150, 150)"}}>Username</Form.Label>
                        <Form.Control style={{backgroundColor: "rgb(21,32,43)", borderColor: "#ff7a00" }} type="email" placeholder=" Enter Username" 
                            onInput={(e) => {setUsername(e.currentTarget.value)}}
                            value={username}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{color: "rgb(150, 150, 150)"}}>Password</Form.Label>
                        <Form.Control style={{backgroundColor: "rgb(21,32,43)", borderColor: "#ff7a00", borderInlineColor: "#ff7a00"}} type="password" placeholder="Password" 
                        onInput={(e) => {setPassword(e.currentTarget.value)}}
                        value={password}/>
                    </Form.Group >
                    {/* <Link to="/"> */}
                        <Button className="Buttons" variant="primary" type="button"
                            onClick={handleLogin}>
                            Login
                        </Button>

                    {/* </Link> */}
                    </Form>
                    <div style={{width: "40%", height: "30%", marginTop: "25%"}}>
                        <Image src="appLogo.png" fluid/>
                    </div>
                </div>
            </div>

        </div>
        
            
    )
}

export const LoginAdminScreen = () => {

	const logIn = useStoreActions((state) => state.logIn);
    const restHost = useStoreState((state) => state.restHost);

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleLogin = async () => {
        try{
            const response = await axios.post(`${restHost}/login/Admin`, {
                username: username,
                password: password,
            })
            const authorData = response.data
            logIn({
                ...authorData,
                isAdmin: true,
            })
            navigate("/Admin")
            // window.location.href = "/SiteAdmin"
        }
        catch(err){
            console.log(err)
            alert("Login Failed.")
        }
    }
    return (
        <body style={{backgroundColor: "rgb(21,32,43)"}}> 
            <div className="container">
                <header style={{color: "rgb(255, 122, 0)", fontSize:"200%"}}>
                    Login Site Admin
                </header>
                <div style={{
                    display: "flex", alignItems: "center", color: "rgb(150, 150, 150)",
                    flexDirection: "column" }}>
                    <p style={{fontWeight: "bold"}}>Enter your info below</p>     
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{color: "rgb(150, 150, 150)"}}>Email address</Form.Label>
                        <Form.Control style={{backgroundColor: "rgb(21,32,43)", borderColor: "#ff7a00" }} type="email" placeholder="Enter email"
                        onInput={(e) => {setUsername(e.currentTarget.value)}}
                        value={username} />
                       
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{color: "rgb(150, 150, 150)"}}>Password</Form.Label>
                        <Form.Control style={{backgroundColor: "rgb(21,32,43)", borderColor: "#ff7a00", borderInlineColor: "#ff7a00"}} type="password" placeholder="Password" 
                        onInput={(e) => {setPassword(e.currentTarget.value)}}
                        value={password} />
                    </Form.Group >
                        <Button className="Buttons" variant="primary" type="button"
                            onClick={handleLogin}>
                            Login Admin
                        </Button>
                    </Form>
                </div>

            </div>
        </body>
        
    )
}