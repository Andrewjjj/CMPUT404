import React from 'react'
import { Link } from "react-router-dom";
export const FriendScreen = (props) => {
    return (
        <>
            <div>
                This is a Friend Screen!
            </div>
            <Link to="/">
                <button className="btn btn-danger" href="/">Go Back to Main Menu</button>
            </Link>
        </>
    )
}