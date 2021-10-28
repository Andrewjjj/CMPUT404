
import {Friend} from './Friend.jsx'


export const List = ({friends}) => {

        return (
            <>
            {friends.map((friend) => (<Friend key = {friend.id} friend={friend} />) )}
            </>
        )
}


