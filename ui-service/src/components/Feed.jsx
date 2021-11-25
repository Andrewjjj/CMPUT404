import { ProfileHeader } from "./ProfileHeader"
import { PostList } from "./PostList"

export const Feed = ({posts}) => {
    
        
    return (
        <div className='containerFeed'>
           <ProfileHeader title="Feed"></ProfileHeader>
           <PostList posts={posts}></PostList>
        </div>
    )
}