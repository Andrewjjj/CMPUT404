import React from 'react'
import { Link } from 'react-router-dom'

export const InboxScreen = (props) => {
    return (
        <>
            <div>
                This is an Inbox Screen!
            </div>
            <Link to="/">
                <button className="btn btn-danger" href="/">Go Back to Main Menu</button>
            </Link>
        </>
    )
}