import {ProfileHeader} from './ProfileHeader'
import {Details} from './Details'
export const Profile = ({author} ) => {
    
    return (
        <div className="containerProfile">
            <div>
                <ProfileHeader title="Profile"></ProfileHeader>
                <Details author={author}></Details>
                </div>
        </div>
        
    )

}