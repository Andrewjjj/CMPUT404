
import { useEffect, useState } from 'react'
import { useStoreState } from 'easy-peasy'

export const Comment = (props) => {

    const [comments, setComments] = useState([])

    const restHost = useStoreState((state) => state.restHost)

    useEffect(() => {
        fetchComments(props.authorID, props.postID)
    }, [props.authorID, props.postID])

    const submitCommentHandler = (postID, authorID) => {

    }

    const fetchComments = async (authorID, postID) => {
        try{
            const response = await axios.get(`${restHost}/author/${authorID}/posts/${postID}/comments`)
            setComments(response.data)
        }
        catch(err){
            console.log(err)
            alert("Cannot get Comments for " + postID)
        }
    }

    return (
        <div className="mt-2 mx-2">
            {comments.map((comment, i) =>
                <div key={"comment_" + i}>
                    <div className="column my-2 px-5 text-start">
                        <div className="col-3 bg-grey" style={{ fontStyle: "italic", color: "rgb(255,122,0)" }}>
                            {comment.author.displayName}
                        </div>
                        <div className="col text-start">
                            {comment.comment}
                        </div>
                    </div>
                </div>
            )}
            <div className="row px-5 py-2">
                Comment: <input type="text" id={"comment_" + post.PostID} className="form-control-sm" onInput={(e) => commentChangeHandler(post.PostID, e.target.value)}></input>
                <div className="col text-end">
                    <button className="btn" onClick={() => {
                        submitCommentHandler(props.postID, props.authorID)
                    }}>Submit</button>
                </div>
            </div>
        </div>
    )
}