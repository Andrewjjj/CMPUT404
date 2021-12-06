
import { useEffect, useState } from "react"

export const PostComponent = (props) => {

    const [post, setPost] = useState()

    useEffect(() => {
        setPost(props.post)
        // const post = props.post;
    }, [])

    const likeClickHandler = (postID) => {

    }

    return (
        <div className=" w-50 mt-3 mx-auto border p-4 rounded-5 z-depth-2 text-white"
            style={{ backgroundColor: "rgb(30,47,65)" }}>
            {/* Title Section */}
            <div className="row" style={{ textAlign: 'left' }}>
                <h5><b>{post.title}</b></h5>
                <button onClick={() => { }}>{post.author.displayName}</button>
                <h6 style={{ fontStyle: "italic", color: "rgb(255,122,0)" }}>{post.AuthorName} </h6>
            </div>

            {/* Content Section */}
            <div className="row rounded rounded-5 py-2 px-4" style={{ backgroundColor: "rgb(30,47,65)" }}>
                {post.content}
            </div>
            {/* React Section */}
            <div className="row my-2">
                <div className="col" role="group">
                    <button type="button" class="btn btn-dark" style={{ backgroundColor: "rgb(30,47,65)" }} data-mdb-color="dark"
                        onClick={() => {
                            likeClickHandler(post.PostID)
                        }}>
                        <i className="far fa-thumbs-up fa-1x"></i>+{post.Likes}
                    </button>
                </div>
            </div>

        </div>
    )
}