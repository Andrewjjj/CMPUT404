import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { CreatePostModal } from '../components/CreatePostModal';
import { Button } from 'react-bootstrap'
import { WithContext as ReactTags } from 'react-tag-input';
import { useStoreActions, useStoreState } from 'easy-peasy'
import { CommentSection } from './CommentSection';

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


export const ReactionSection = (props) => {
    
    const authorInfo = useStoreState((state) => state.author)
    const restHost = useStoreState((state) => state.restHost)

    return (
        <div id={ReactionSection}>
            {/* Reaction Section */}
            <div className="row my-2">
                <div class="btn-group-sm shadow-0 col" role="group">
                     {props.post.visibility !== "FRIENDS" || props.likes === undefined ? "" : "Likes: " + props.likes.length }
                         <button type="button" class="btn btn-dark shadow-0" style={{backgroundColor: "rgb(30,47,65)"}}data-mdb-color="dark"
                            onClick={() => {
                                props.clickHandler(props.post.id, props.post.author.id)
                            }}>
                            <i className="far fa-thumbs-up fa-1x"></i>
                        </button>
                        <button className="btn" onClick={() => {
                                props.shareHandler(props.post)
                        }}>Share</button>
                </div>
            </div>
        </div>
     );
}