import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useStoreActions, useStoreState } from 'easy-peasy'

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
                     {props.likes === undefined ? "" : "Likes: " + props.likes.length }
                         <button type="button" class="btn btn-dark shadow-0" style={{backgroundColor: "rgb(30,47,65)"}}data-mdb-color="dark"
                            onClick={() => {
                                props.clickHandler(props.post.id, props.post.author.id)
                            }}>
                            <i className="far fa-thumbs-up fa-1x"></i>
                        </button>
                    {props.post.visibility !== "PRIVATE" ?
                        <button className="btn" onClick={() => {
                                props.shareHandler(props.post)
                        }}>Share</button> : ""
                    }
                </div>
            </div>
        </div>
     );
}