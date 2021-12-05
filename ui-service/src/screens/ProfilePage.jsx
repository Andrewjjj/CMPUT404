

import { useEffect, useState } from 'react'
import { Profile } from '../components/Profile';
import { Feed } from '../components/Feed'
import { useStoreState } from 'easy-peasy'
import { useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'

export const ProfilePage = () => {

    // const { ProfileAuthorID } = useParams()
    const [searchParams, setSearchParams] = useSearchParams();

    const ProfileAuthorID = searchParams.get('authorID')
    // const src = searchParams.get('src')
    // const f = searchParams.get('f')

    const [posts, setPosts] = useState([]) 
    const [author, setAuthor] = useState({})

    const authorInfo = useStoreState((store) => store.author)

    const fetchAuthor = async () => {
        console.log("Info Author ID: ", ProfileAuthorID)
        let response = await axios.get(ProfileAuthorID)
        // console.log(response.data)
        setAuthor(response.data)
        // console.log(postData)
        // let postData = response.data.items
        // setPosts(postData)
    }

    useEffect(() => {
        console.log("ProfileAuthorID", ProfileAuthorID)
        // setAuthor(authorInfo)
        fetchAuthor()
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
            </div>
        </div>
    )
}

export default ProfilePage;
