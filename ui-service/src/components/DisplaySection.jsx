import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useStoreActions, useStoreState } from 'easy-peasy';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

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
                {props.post.contentType === "text/markdown" ? 
                    <ReactMarkdown>{props.post.content}</ReactMarkdown>
                :
                    props.post.content}
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