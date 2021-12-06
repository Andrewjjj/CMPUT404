import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { CreatePostModal } from '../components/CreatePostModal';
import { Button } from 'react-bootstrap'
import { WithContext as ReactTags } from 'react-tag-input';
import { useStoreActions, useStoreState } from 'easy-peasy'
import { CommentSection } from './CommentSection';
import { ReactionSection } from './ReactionSection';
import { EditSection } from './EditSection';

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


export const UpperEditSection = (props) => {
    
    const authorInfo = useStoreState((state) => state.author)
    const restHost = useStoreState((state) => state.restHost)

    
    return (
        <div id={UpperEditSection}>
            {/* Title Section */}
            <div className="row" style={{textAlign: 'left'}}>
                <input type="text" id={"edit_title_"+props.post.id} className="form-control-sm" onInput={(e) => props.titleHandler(props.post.id, e.target.value)}></input>
                <h6 style={{fontStyle: "italic",color: "rgb(255,122,0)"}}>{props.post.author["displayName"]} </h6>
            </div>
            {/* Content Section */}
            <div className="row rounded rounded-5 py-2 px-4" style={{backgroundColor: "rgb(30,47,65)"}}>
                <input type="text" id={"edit_body_"+props.post.id} className="form-control-sm" onInput={(e) => props.bodyHandler(props.post.id, e.target.value)}></input>
            </div>
        </div>
     );
}