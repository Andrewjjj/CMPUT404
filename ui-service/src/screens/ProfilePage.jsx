

import { useEffect, useState } from 'react'
import { Profile } from '../components/Profile';
import { Feed } from '../components/Feed'
import { useStoreState } from 'easy-peasy'
import axios from 'axios'

export const ProfilePage = () => {

    const [posts, setPosts] = useState([]) 
    const [author, setAuthor] = useState({})

    const authorInfo = useStoreState((store) => store.author)

    const fetchData = async () => {
        console.log("Info: ", authorInfo.id)
        let response = await axios.get(`${authorInfo.id}/posts`)
        let postData = response.data.items
        console.log(response.data)
        console.log(postData)
        setPosts(postData)
    }

    useEffect(() => {
        // console.log(authorInfo)
        setAuthor(authorInfo)
        fetchData()
    }, [])
    
    return (
        <div style={{ backgroundColor: "rgb(21, 32, 43)", height: "753px" }}>
            <div className="bodyDiv">
                {Object.keys(author).length != 0 ? (
                <>
                    <Profile author={author}></Profile>
                    <div className='headerProfile'>
                        <h1>{author.displayName}</h1>
                    </div>
                    <div className="PostList">
                    {posts.map((post) => (
                        <div style={{textAlign: 'left', color: "white", padding:"20px",margin:"10px", backgroundColor:"#1E2F41", borderRadius:"10px"}}>
                            <h4><b>{post.title}</b></h4>
                            <h5 style={{fontStyle: "italic",color: "rgb(255,122,0)"}}>{post.author.displayName} </h5>
                            <br></br>
                            <div>
                                {post.description}
                            </div>
                        </div>
                    ))}
                    </div>
                </>
                ) : <></>}
                {/* <Feed posts={posts}></Feed> */}
            </div>
        </div>
    )
}

export default ProfilePage;
