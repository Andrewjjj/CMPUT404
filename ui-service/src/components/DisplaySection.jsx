import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useStoreActions, useStoreState } from 'easy-peasy';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

Modal.setAppElement('#root');

export const DisplaySection = (props) => {
    
    const authorInfo = useStoreState((state) => state.author)
    const restHost = useStoreState((state) => state.restHost)


    const PostContentComponent = ({contentType, content}) => {
        // const [previewImg, setPreviewImg] = useState(null) 
    
        // useEffect(() => {
        // }, [])
        console.log(contentType)
        switch (contentType){
            case "text/plain":
                return (
                    <>
                    {content}
                    </>
                )
            case "text/markdown":
                return (
                    <>
                    {content}
                    </>
                )
            case "application/base64":
                return (
                    <>
                    {content}
                    </>
                )
            case "image/jpeg;base64":
                // setPreviewImg(`data:image/jpeg;base64,${content}`)

                console.log("Content!!",content)
                // URL.createObjectURL(blob)
                // axios.
                if(!content) return <></>
                return (
                    <>
                    <img src={`data:image/jpeg;base64,${content}`} />
                    </>
                )
            case "image/png;base64":
                // setPreviewImg(`data:image/png;base64,${content}`)

                console.log("Content!!",content)
                // console.log(new Buffer.from(content).toString("base64"))
                // console.log(new Buffer.from(content.data).toString("base64"))
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

                {/* {props.post.contentType === "text/markdown" ? 
                    <ReactMarkdown>{props.post.content}</ReactMarkdown>
                :
                    props.post.content} */}
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