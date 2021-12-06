import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { CreatePostModal } from '../components/CreatePostModal';
import { Button } from 'react-bootstrap'
import { WithContext as ReactTags } from 'react-tag-input';
import { useStoreActions, useStoreState } from 'easy-peasy'
import { CommentSection } from './CommentSection';
import { ReactionSection } from './ReactionSection';

import { Link } from 'react-router-dom'
import axios from 'axios'

Modal.setAppElement('#root');

const customStyles = {
    content: {
        width: '60%',
        marginLeft: "auto",
        marginRight: "auto",
    },
};


export const EditSection = (props) => {
    
    const authorInfo = useStoreState((state) => state.author)
    const restHost = useStoreState((state) => state.restHost)
   
    return (
        <div id={EditSection}>
                {/* Edit Section */}
                { props.post.visibility === "PUBLIC" && props.post.author.id === `${restHost}/author/${authorInfo.id}` ?
                    <div className="row my-2">
                    <div class="btn-group-sm shadow-0 col" role="group">
                        {/*TODO: INVERT THE IF STATEMENT ONCE OUT OF TESTING */}
                        {props.post.id === props.editingPostID ?
                            <button className="btn" onClick={() => {
                                props.editHandler(props.post)
                            }}>Stop editing</button>:
                            <button className="btn" onClick={() => {
                                props.editHandler(props.post)
                            }}>Edit</button>}
                        {props.post.id === props.editingPostID ? 
                        <button className="btn" onClick={() => {
                            props.submitHandler(props.post)
                        }}>Submit edit</button>:
                        <button className="btn" onClick={() => {
                            props.deleteHandler(props.post)
                        }}>Delete</button>}
                        </div>
                    </div> : ""
                }
        </div>
     );
}