import { useEffect, useState } from "react"
import axios from 'axios'
import { Button, Card, Modal } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
export const AuthorForeignScreen = () => {
    const [authors, setAuthors] = useState([])
    const [host, setHost] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [show, setShow] = useState(false);
    const [modalHeader, setModalHeader] = useState("")
    const [modalContent, setModalContent] = useState("")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  

    const navigator = useNavigate()

    useEffect(() => {
        // axios.interceptors.request.use(request => {
        //     console.log('Starting Request', request)
        //     return request
        // })
        console.log(authors)
    }, [])

    const connectToForeignHostHandler = async () => {
        try {
            let token = btoa(`${username}:${password}`)
            let response = await axios.get(host, {
                headers: {
                    "Authorization": `Basic ${token}`
                }
            })
            console.log(response);
            // console.log(response.data.items)
            setAuthors(response.data.items)
        }
        catch (err) {
            console.log(err)
            alert(err)
        }
    }

    const ModalComponent = () => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{modalHeader}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalContent}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <div className="m-5">
            <ModalComponent />
            <Button onClick={() => {navigator("/Home")}}>Go Back</Button>
            <div className="row border mx-5 my-2">
                Get Authors URL: <input type="text" value={host} onInput={(e) => { setHost(e.currentTarget.value) }} />
            </div>
            <div className="row border mx-5 my-2">
                Username: <input type="text" value={username} onInput={(e) => { setUsername(e.currentTarget.value) }} />
            </div>
            <div className="row border mx-5 my-2">
                Password: <input type="text" value={password} onInput={(e) => { setPassword(e.currentTarget.value) }} />
            </div>
            <div className="row">
                <div className="col text-center">
                    <Button onClick={connectToForeignHostHandler}>Get all authors!</Button>
                </div>
            </div>
            <hr className="my-2" />
            <div className="my-5 text-center">
                {authors.map(author => (
                    <Card key={author.id} style={{ marginTop: "20px", width: "33%", marginRight: "auto", marginLeft: "auto" }}>
                        {/* <div className="row border m-5"> */}
                        <Card.Img variant="top" src={`${author.profileImage}`} />
                        <Card.Body>
                            <Card.Title>
                                Author Name: {author.displayName}
                            </Card.Title>
                            <Card.Text>
                                name: {author.displayName}
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Button style={{marginRight: "5px"}}
                                onClick={() => {
                                    setModalHeader("Github Link")
                                    setModalContent(author.github)
                                    handleShow()
                                }}>
                                Github Link
                            </Button>
                            <Button style={{marginLeft: "5px"}}
                                onClick={() => {
                                    setModalHeader("AuthorID")
                                    setModalContent(author.id)
                                    handleShow()
                                }}>
                                View Posts
                            </Button>
                        </Card.Body>
                        {/* </div> */}
                    </Card>
                ))}
            </div>
        </div>
    )
}

