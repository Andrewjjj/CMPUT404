import React from 'react'
import { useState, useEffect } from 'react'
import { useStoreState } from 'easy-peasy'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams, useSearchParams } from 'react-router-dom'

export const AdminFriendsScreen = (props) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const authorID = searchParams.get('authorID')
  const [friends, setFriends] = useState([]);

  const restHost = useStoreState((state) => state.restHost)
  const authorInfo = useStoreState((state) => state.author)

  const navigate = useNavigate()

  useEffect(() => {
    fetchAuthors()
  }, [])


  const fetchAuthors = async () => {
    try {

      let friendResponse = await axios.get(`${authorID}/friends`)
      let friends = friendResponse.data

      console.log(friends)
      setFriends(friends)
    }
    catch (err) {
      console.log(err)
      alert(err)
    }
  }

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (
    <div className="container">
      <div>
        <div className='headerc'>
          <div><h1>Friends</h1></div>
        </div>
      </div>
      <>
        {friends.map((follower) => (
          <div className='friend'>
            <div className='friendDivRight'>
              <img className='profileImage' src={follower.profileImage} alt=""></img>
              <h4>{follower.displayName}</h4>
              {/* <p>{friend.type}</p> */}
            </div>
            <div className='friendDivLeft'>
              <div>
                <button className='friendDivButton' onClick={() => { navigate(`/Admin/Authors/Profile?authorID=${follower.id}`) }} rel="noreferrer noopener" target="_blank"> Visit Profile </button>
              </div>
              <div>
                <button className='friendDivButton' onClick={() => { openInNewTab(follower.github) }} rel="noreferrer noopener" target="_blank" target="_blank"> Visit Github </button>
              </div>
            </div>

          </div>
          // <Friend key = {friend.id} friend={friend} />
        ))}
      </>
    </div>
  )
}


