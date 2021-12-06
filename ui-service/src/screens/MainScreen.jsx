import React, { useState, useEffect } from 'react';
import {Button, Input, Form} from 'react-bootstrap';
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'

export const MainScreen = () => {
    const navigate = useNavigate()

    const logOut = useStoreActions((state) => state.logOut)
    const authorInfo = useStoreState((state) => state.author)
    const restHost = useStoreState((state) => state.restHost)
    const st = useStoreState(s => s)

    useEffect(() => {
        console.log(`/Profile/${restHost}/author/${authorInfo.id}`)
        if(!authorInfo) navigate("/")
        console.log(st)

    }, [])

    const logOutHandler = () => {
        logOut()
        navigate("/")
    }
    
    return(
        <>
        <body className="background">
            <div style={{backgroundColor: "rgb(21, 32, 43)"}}>
                <div id="mainscreen" className="text-center my-5" style={{backgroundColor: "rgb(21,32,43)", display: "flex", justifyContent: "center"}}>
                        
                        <div style={{display: 'flex'}}>
                            <Button className="Buttons mx-2" onClick={() => {navigate(`/Profile?authorID=${restHost}/author/${authorInfo.id}`)}}>Go to Profile</Button>
                            <Button className="Buttons mx-2" onClick={() => {navigate("/Inbox")}}>Inbox</Button>
                            <Button className="Buttons mx-2" onClick={() => {navigate("/Friends")}}>Authors</Button>
                            <Button className="Buttons mx-2" onClick={() => {navigate("/Posts")}}>My Posts</Button>
                            <Button className="Buttons mx-2" onClick={() => {navigate("/Server")}}>All Posts</Button>
                        </div>
                        
                        <div style={{backgroundColor: "rgb(21,32,43)", marginTop: "0"}}>
                        </div>
                        
                        <div style={{display: 'flex'}}>
                            <Button className="Buttons mx-2" onClick={() => {navigate("/Posts/Others")}}>Go to Post Others</Button>
                            <Button className="Buttons mx-2" onClick={() => {logOutHandler()}}>Logout</Button>
                
                        </div>
                </div> 
            </div>
        </body>
        </>
    )
}
