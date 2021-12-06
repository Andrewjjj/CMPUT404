import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import axios from "axios";

export const AdminAuthorScreen = (props) => {
    const [host, setHost] = useState("");
    const [authors, setAuthors] = useState([]);
    const logOut = useStoreActions((state) => state.logOut)
    const navigate = useNavigate()
    const restHost = useStoreState((state) => state.restHost)

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        try {
            let response = await axios.get(`${restHost}/authors`);
            let authors = response.data.items;
            console.log(authors);

            setAuthors(authors);
        } catch(err) {
            console.log(err);
            alert(err);
        }
    }

    const deleteAuthorHandler = async (author) => {
        await axios.delete(`${author.id}`);
        alert("success");
        window.location.reload();
    }

    const logOutHandler = () => {
        logOut()
        navigate("/")
    }

    return (
        <body className="background">
            <div id="colortheme" className="container" style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
                <div  align="center">
                    <Button className="Buttons mx-2" onClick={() => {navigate("/Admin")}}>Return to main</Button>
                    <Button className="Buttons mx-2" onClick={() => {logOutHandler()}}>Logout</Button>
                </div>
                <div style={{display: 'flex', gap: "20px"}} className="row">
                    {authors.map((author, i) =>
                    <div>
                        <img className= 'profileImage' src= {author["profileImage"]} alt=""></img>
                        {author.displayName}
                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Button className="Buttons mx-2" onClick={() => {navigate(`/Admin/Authors/Profile?authorID=${author.id}`)}}>Edit Profile</Button>
                            <Button className="Buttons mx-2" onClick={() => {navigate(`/Admin/Authors/Friends?authorID=${author.id}`)}}>View Friends</Button>
                            <Button className="Buttons mx-2" onClick={() => {deleteAuthorHandler(author)}}>Delete Author</Button>
                        </div>
                        
                    </div>
                    )}
                </div>
                <Button className= "Buttons mx-2" onClick={() => navigate("/Admin/Authors/Create")}> Add Author </Button>
                </div>
        </body>
        
    )
}