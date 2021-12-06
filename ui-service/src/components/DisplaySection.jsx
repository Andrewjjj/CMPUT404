import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useStoreActions, useStoreState } from 'easy-peasy';
import ReactMarkdown from 'react-markdown';

Modal.setAppElement('#root');

export const DisplaySection = (props) => {
    
    const PostContentComponent = ({contentType, content}) => {
        switch (contentType){
            case "text/plain":
                return (
                    <>
                    {content}
                    </>
                )
            case "text/markdown":
                console.log("MARKDOWNNNn")
                return (
                    <>
                    <ReactMarkdown>{content}</ReactMarkdown>
                    </>
                )
            case "application/base64":
                return (
                    <>
                    {content}
                    </>
                )
            case "image/jpeg;base64":
                if(!content) return <></>
                return (
                    <>
                    <img src={`data:image/jpeg;base64,${content}`} />
                    </>
                )
            case "image/png;base64":
                if(!content) return <></>
                return (
                    <>
                    <img src={`data:image/png;base64,${content}`} />
                    </>
                )
            default:
                return <>????</>
        }
    }   

    return (
        <div id={DisplaySection}>
                {/* Title Section */}
                <h5><b>{props.post.title}</b></h5>
                <h6 style={{fontStyle: "italic",color: "rgb(255,122,0)"}}>{props.post.author["displayName"]} </h6>
                {/* Content Section */}
                <div>
                <PostContentComponent contentType={props.post.contentType} content={props.post.content}/>
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