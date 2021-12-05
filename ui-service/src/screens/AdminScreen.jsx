import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { NodeList } from "../components/NodeList";
import { Header } from "../components/Header";
import { useState, useEffect } from "react";
import { useStoreState } from 'easy-peasy'

import axios from "axios";

export const AdminScreen = (props) => {
    const [Nodes, setNodes] = useState([]);
    const [host, setHost] = useState("");

    const [registrationList, setRegistrationList] = useState([])

    const restHost = useStoreState((state) => state.restHost)

    useEffect(() => {
        fetchNodes();
        fetchRegistrationRequests();
    }, []);

    const fetchNodes = async () => {
        try {
            let response = await axios.get(`${restHost}/admin/nodes`);
            let nodes = response.data;
            console.log(nodes);

            setNodes(nodes);
        } catch(err) {
            console.log(err);
            alert(err);
        }
    }

    const addNode = async () => {
        await axios.post(`${restHost}/admin/nodes`, {
            host: host,
        })
        alert("success");
        window.location.reload();
    }

    const deleteAllNodes = async () => {
        await axios.delete(`${restHost}/admin/nodes`);
        alert("success");
        window.location.reload();
    }

    const fetchRegistrationRequests = async () => {
        const response = await axios.get(`${restHost}/register`)
        setRegistrationList(response.data)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
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
                <div className="col">
                    <div>
                        <Header title="Registration Requests" /> 
                    </div>
                    <div>
                        {registrationList.map(user => (
                            <>
                            {user.Username}
                            <Button className="btn btn-primary" onClick={deleteAllNodes}>
                                Approve
                            </Button>
                            <Button className="btn btn-danger" onClick={deleteAllNodes}>
                                Reject
                            </Button>
                            </>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}