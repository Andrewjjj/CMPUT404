import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { NodeList } from "../components/NodeList";
import { Header } from "../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";

export const AdminScreen = (props) => {
    const [Nodes, setNodes] = useState([]);
    const [host, setHost] = useState("");

    useEffect(() => {
        fetchNodes();
    }, []);

    const fetchNodes = async () => {
        try {
            let response = await axios.get("https://fast-chamber-90421.herokuapp.com/admin/nodes");
            let nodes = response.data;
            console.log(nodes);

            setNodes(nodes);
        } catch(err) {
            console.log(err);
            alert(err);
        }
    }

    const addNode = async () => {
        await axios.post("https://fast-chamber-90421.herokuapp.com/admin/nodes", {
            host: host,
        })
        alert("success");
        window.location.reload();
    }

    const deleteAllNodes = async () => {
        await axios.delete("https://fast-chamber-90421.herokuapp.com/admin/nodes");
        alert("success");
        window.location.reload();
    }

    return (
        <div className="container">
            <div>
                <Header title="Nodes" /> 
            </div>
            <div>
                <NodeList nodes={Nodes} />
            </div>
            <InputGroup className="mb-3">
                <FormControl
                placeholder="Host"
                aria-label="Host"
                aria-describedby="Host"
                onInput={(e) => {setHost(e.currentTarget.value)}}
                value={host}
                />
                <Button variant="outline-secondary" id="Host"
                    onClick={addNode}>
                    Add Host
                </Button>
            </InputGroup>
            <Button className="btn btn-danger" onClick={deleteAllNodes}>
                Delete All Nodes
            </Button>
        </div>
    )
}