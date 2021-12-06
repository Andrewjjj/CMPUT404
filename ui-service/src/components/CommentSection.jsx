import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useStoreActions, useStoreState } from 'easy-peasy'
import ReactMarkdown from 'react-markdown';

Modal.setAppElement('#root');

export const CommentSection = (props) => {

    const authorInfo = useStoreState((state) => state.author)
    const restHost = useStoreState((state) => state.restHost)

    return (
        <div id={CommentSection}>
            <div className="mt-2 mx-2">
                { 
                    props.post.visibility !== "FRIENDS" || props.post.author.id === `${restHost}/author/${authorInfo.id}`  ?( props.comments === undefined ? "" : props.comments.comments.map((comment, j) => 
                        <div key={"comment_"+j}>
                            <div className="column my-2 px-5 text-start">
                                <div className="col-3 bg-grey" style={{fontStyle: "italic",color: "rgb(255,122,0)"}}>
                                    {comment.author.displayName}
                                </div>
                                <div className="col text-start">
                                {comment.contentType === "text/markdown" ? 
                                    <ReactMarkdown>{comment.comment}</ReactMarkdown>
                                :
                                    comment.comment}
                                </div>
                            </div>
                        </div>
                    )) : ""
                }
                <div className="row px-5 py-2">
                    Comment: <input type="text" id={"comment_"+props.post.id} onInput={(e) => props.changeHandler(props.post.id, e.target.value)} className="form-control-sm"></input>
                    <span>
                        Enable markdown: <input type="checkbox" onChange={(e) => props.checkHandler(props.post.id, e.target.checked)}></input>
                    </span>
                    <div className="col text-end">
                        <button className="btn" onClick={() => {
                             props.submitHandler(props.post.id)
                        }}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
     );
}