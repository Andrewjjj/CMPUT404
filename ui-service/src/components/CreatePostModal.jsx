import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { WithContext as ReactTags } from 'react-tag-input';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        width: '60%',
        marginLeft: "auto",
        marginRight: "auto",
    },
};


const KeyCodes = {
    comma: 188,
    enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export const CreatePostModal = (props) => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [tags, setTags] = useState([]);

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const setTitleHandler = (title) => {
        setTitle(title)
    }
    const setContentHandler = (content) => {
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
    
    const createPostHandler = () => {
        console.log("??")
        props.submitPostHandler(title, content, tags.map(e => e.text))
        console.log("??2")
    }

    useEffect(() => {
        setTitle("")
        setContent("")
        setTags([])
    }, [])

    return (
        <Modal
            isOpen={props.isVisible}
            style={customStyles}>
            <div className="text-center">
                Create a Post
            </div>
            <div className="row">
                title: <input type="text" className="form-control" onInput={e => setTitleHandler(e.target.value)}></input>
            </div>
            <div className="row">
                content: <textarea type="text" className="form-control" onInput={e => setContentHandler(e.target.value)}></textarea>
            </div>
            <div className="row my-3">
                Tags: <ReactTags
                    tags={tags}
                    // suggestions={suggestions}
                    delimiters={delimiters}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    handleTagClick={handleTagClick}
                    inputFieldPosition="bottom"
                    autocomplete
                />
            </div>
            <button className="btn btn-primary"
                onClick={createPostHandler}>Create Post</button>
            <button className="btn btn-danger"
                onClick={() => props.setVisible(false)}>Close</button>
        </Modal>
    );
}