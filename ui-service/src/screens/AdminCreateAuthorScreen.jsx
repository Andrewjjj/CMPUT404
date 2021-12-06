import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import {Button, Input, Form} from 'react-bootstrap';
import { useStoreState } from 'easy-peasy'
import { useNavigate} from 'react-router-dom'

export const AdminCreateAuthorScreen = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [githubUrl, setGithubUrl] = useState("")
    const [profileImageUrl, setProfileImageUrl] = useState("")

    const restHost = useStoreState((state) => state.restHost)

    const navigate = useNavigate()

    const registerHandler = async () => {
        try{
            await axios.put(`${restHost}/authors`, {
                username: username,
                password: password,
                githubUrl: githubUrl,
                profileImageUrl: profileImageUrl,
            })
            alert("success!")
        }
        catch(err){
            console.log(err)
            alert(err)
        }
    }

    return (
        <body style={{backgroundColor: "rgb(21,32,43)"}}> 
            <div className="container">
                <header style={{color: "rgb(255, 122, 0)", fontSize:"200%"}}>
                </header>
                <div style={{
                    display: "flex", alignItems: "center", color: "rgb(150, 150, 150)",
                    flexDirection: "column" }}>
                    <p style={{fontWeight: "bold"}}>Enter at least an ID and a password to create a new author</p>     
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{color: "rgb(150, 150, 150)"}}>Username</Form.Label>
                        <Form.Control style={{backgroundColor: "rgb(21,32,43)", borderColor: "#ff7a00" }} type="text" placeholder="Enter email" value={username} onInput={(e) => setUsername(e.currentTarget.value)}/>
                       
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{color: "rgb(150, 150, 150)"}}>Password</Form.Label>
                        <Form.Control style={{backgroundColor: "rgb(21,32,43)", borderColor: "#ff7a00", borderInlineColor: "#ff7a00"}} type="password" placeholder="Password"  value={password} onInput={(e) => setPassword(e.currentTarget.value)}/>
                    </Form.Group >
                    <Form.Group className="mb-3" controlId="formBasicGithub">
                        <Form.Label style={{color: "rgb(150, 150, 150)"}}>Github URL</Form.Label>
                        <Form.Control style={{backgroundColor: "rgb(21,32,43)", borderColor: "#ff7a00", borderInlineColor: "#ff7a00"}} type="text" placeholder="https//www.github.com/..."  value={githubUrl} onInput={(e) => setGithubUrl(e.currentTarget.value)}/>
                    </Form.Group >
                    <Form.Group className="mb-3" controlId="formBasicProfileImage">
                        <Form.Label style={{color: "rgb(150, 150, 150)"}}>Profile Image Link</Form.Label>
                        <Form.Control style={{backgroundColor: "rgb(21,32,43)", borderColor: "#ff7a00", borderInlineColor: "#ff7a00"}} type="text" placeholder="Image Link"  value={profileImageUrl} onInput={(e) => setProfileImageUrl(e.currentTarget.value)}/>
                    </Form.Group >
                    <Button className="Buttons" variant="primary" type="submit" onClick={registerHandler}>
                        Create User
                    </Button>
                   
                    </Form>
                </div>

            </div>
        </body>
        
    )




}