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

export const DisplaySection = (props) => {
    
    const authorInfo = useStoreState((state) => state.author)
    const restHost = useStoreState((state) => state.restHost)

    return (
        <div id={DisplaySection}>
                {/* Title Section */}
                <h5><b>{props.post.title}</b></h5>
                <h6 style={{fontStyle: "italic",color: "rgb(255,122,0)"}}>{props.post.author["displayName"]} </h6>
                {/* Content Section */}
                <div>
                {props.post.content}
                </div>
                {/* Tag Section */}
                <div className="row my-1">
                        <p className="text-grey">
                        Tags: 
                        {props.post.categories.map((tag, i) => 
                            <span> {tag}</span>
                        )}
                        </p>
                </div>
        </div>
     );
}