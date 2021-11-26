import { Post } from "./Post"
export const PostList = ({posts}) => {

    return (
        <div className="PostList">
        {posts.map((post) => (<Post key = {post.id} post={post} />) )}
        </div>
    )
}