import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import { WithContext as ReactTags } from 'react-tag-input';
import { Dropdown, Form, Button} from 'react-bootstrap'
import axios from 'axios';
import { useStoreState } from 'easy-peasy';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        width: '45%',
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "rgb(21,32,43)",
        color: "aliceblue",

    },
};


const KeyCodes = {
    comma: 188,
    enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export const CreatePostModal = (props) => {

    const inputRef = useRef(null);
    const contentRef = useRef(null);

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [content, setContent] = useState("")
    const [tags, setTags] = useState([]);
    const [dropdownText, setDropdownText] = useState("Please Select");
    const [contentType, setContentType] = useState(null);
    const [fileContent, setFileContent] = useState(null);

    const [visibility, setVisibility] = useState("PUBLIC");
    const [unlisted, setUnlisted] = useState(false);

    const restHost = useStoreState((state) => state.restHost)
    const authorInfo = useStoreState((state) => state.author)
    console.log("AuthorInfo",authorInfo)
    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const setTitleHandler = (title) => {
        setTitle(title)
    }
    const setContentHandler = (content) => {
        console.log(content)
        setContent(content)
    }

    const handleAddition = tag => {
        setTags([...tags, tag]);
        console.log(tags)
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        setTags(newTags);
    };

    const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    const createPostHandler = async () => {
        console.log(fileContent)
        const formData = new FormData();
        try {
            let axiosConfig = {};
            let postData;
            switch (contentType) {
                case "text/plain":
                    console.log("123123123", contentRef.current.value, content)
                    postData = contentRef.current.value;
                    formData.append("content", contentRef.current.value)
                    break;
                case "text/markdown":
                    postData = contentRef.current.value;
                    formData.append("content", contentRef.current.value)
                    break;
                case "application/base64":
                    postData = content;
                    break;
                case "image/jpeg;base64":
                    formData.append("file", fileContent, "image.jpeg")
                    break;
                case "image/png;base64":
                    formData.append("file", fileContent, "image.png")
                    break;
                default:
                    return;
            }
            formData.append("title", title)
            formData.append("source", "")
            formData.append("origin", "")
            formData.append("description", description)
            formData.append("contentType", contentType)
            formData.append("categories", JSON.stringify(tags))
            formData.append("published",  new Date(Date.now()).toString())
            formData.append("visibility", visibility)
            formData.append("unlisted", unlisted)
            console.log({
                content: postData,
                title: title,
                source: "",
                origin: "",
                description: description,
                contentType: contentType,
                categories: tags,
                published: new Date(Date.now()).toString(),
                visibility: visibility,
                unlisted: unlisted,
            })
            let response = await axios.post(`${restHost}/author/${authorInfo.id}/posts`, formData, axiosConfig)
            console.log(response)
            alert("Success")
            props.setVisible(false);
            props.refresh()
        }
        catch (err) {
            console.log(err)
            alert(err)
        }
    }

    const handleDisplayFileDetails = (fileType) => {
        let files = inputRef.current?.files[0]
        if (!files) return;
        let nameSplitArr = files.name.split(".")
        let fileExtension = nameSplitArr[nameSplitArr.length - 1]
        if (fileExtension != fileType) {
            console.log(fileExtension, fileType)
            alert(`File type is not ${fileType}`)
            inputRef.current.value = ""
            return;
        }
        setFileContent(files)
    }

    const PostContentComponent = () => {
        console.log("??")
        switch (contentType) {
            case "text/plain":
                return (
                    <>
                        <div  className="row">
                            content: <textarea id="colortheme" ref={contentRef} type="text" className="form-control" ></textarea>
                        </div>
                    </>
                )
            case "text/markdown":
                return (
                    <>
                        <div id="colortheme" className="row">
                            Markdown content: <textarea id="colortheme" ref={contentRef} type="text" className="form-control" ></textarea>
                        </div>
                    </>
                )
            case "application/base64":
                return (
                    <>
                    </>
                )
            case "image/jpeg;base64":
                if (fileContent != null) {
                    return <>File Ready to be Uploaded</>
                }
                return (
                    <Form.Group id="colortheme" controlId="formFile1" className="mb-3">
                        <Form.Label id="colortheme">Select a JPEG File</Form.Label>
                        <Form.Control onChange={() => handleDisplayFileDetails("jpeg")} type="file" ref={inputRef} />
                    </Form.Group>
                )
            case "image/png;base64":
                if (fileContent != null) {
                    return <>File Ready to be Uploaded</>
                }
                return (
                    <>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label id="colortheme">Select a PNG File</Form.Label>
                            <Form.Control onChange={() => handleDisplayFileDetails("png")} type="file" ref={inputRef} />
                        </Form.Group>
                    </>
                )
            default:
                return (
                    <>
                    </>
                )
        }
    }


    useEffect(() => {
        setTitle("")
        setContent("")
        setTags([])
    }, [])

    useEffect(() => {
        console.log("?")
    }, [content])

    return (
       
         <Modal
            id="colortheme"
            isOpen={props.isVisible}
            style={customStyles}>
            <div id="colortheme" className="text-center">
                Create a Post
            </div>
            <div id="colortheme" className="row">
                Title: <input id="colortheme" type="text" className="form-control" onInput={e => setTitleHandler(e.target.value)}></input>
            </div>
            <div className="row">
                Description: <input id="colortheme" type="text" className="form-control" onInput={e => setDescription(e.target.value)}></input>
            </div>
            <div className="row my-2">
                content Type:
                <div className="col">
                    <Dropdown onChange={() => console.log("123")}>
                        <Dropdown.Toggle className="Buttons" variant="success" id="dropdown-basic">
                            {dropdownText}
                        </Dropdown.Toggle>

                        <Dropdown.Menu id="colortheme" onSelect={() => { console.log("4") }}>
                            <Dropdown.Item id="colortheme"  onClick={() => { setDropdownText("Plain Text (text/plain)"); setContentType("text/plain") }}>Plain Text (text/plain)</Dropdown.Item>
                            <Dropdown.Item id="colortheme" onClick={() => { setDropdownText("Plain Text (text/markdown)"); setContentType("text/markdown") }}>Markdown Text (text/markdown)</Dropdown.Item>
                            <Dropdown.Item id="colortheme" onClick={() => { setDropdownText("Plain Text (application/plain)"); setContentType("application/base64") }}>Bitmap</Dropdown.Item>
                            <Dropdown.Item id="colortheme" onClick={() => { setDropdownText("Image (JPEG)"); setContentType("image/jpeg;base64") }}>Image - JPEG</Dropdown.Item>
                            <Dropdown.Item id="colortheme" onClick={() => { setDropdownText("Image (PNG)"); setContentType("image/png;base64") }}>Image - PNG</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <PostContentComponent />

            <div className="row my-3">
                Tags: <ReactTags id="colortheme"
                    tags={tags}
                    delimiters={delimiters}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    handleTagClick={handleTagClick}
                    inputFieldPosition="bottom"
                    autocomplete
                />
            </div>
            <div className="row my-2">
                <div className="col">
                    Visibility:
                    <Dropdown>
                        <Dropdown.Toggle className="Buttons" variant="success" id="dropdown-basic">
                            {visibility}
                        </Dropdown.Toggle>

                        <Dropdown.Menu onSelect={() => { console.log("4") }}>
                            <Dropdown.Item id="colortheme" onClick={() => { setVisibility("PUBLIC") }}>PUBLIC</Dropdown.Item>
                            <Dropdown.Item id="colortheme" onClick={() => { setVisibility("FRIENDS") }}>FRIENDS</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="col">
                    Unlisted:
                    <Dropdown>
                        <Dropdown.Toggle className="Buttons" variant="success" id="dropdown-basic">
                            {!unlisted ? "True" : "False"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu onSelect={() => { console.log("4") }}>
                            <Dropdown.Item id="colortheme" onClick={() => { setUnlisted(false) }}>True</Dropdown.Item>
                            <Dropdown.Item id="colortheme" onClick={() => { setUnlisted(true) }}>False</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent:'space-evenly'}} className="my-5">
                <Button className="CreativeButton"
                    onClick={createPostHandler}>Create Post</Button>
                <Button className="Buttons"
                    onClick={() => props.setVisible(false)}>Close</Button>
            </div>
        </Modal>
    );
}