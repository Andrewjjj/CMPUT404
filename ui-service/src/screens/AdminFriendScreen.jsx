import React from 'react'
import { Link } from "react-router-dom";
import { Header } from '../components/Header'
import { List } from '../components/List'
import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useStoreState } from 'easy-peasy'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthorForeignScreen } from './AuthorForeignScreen';
import { useParams, useSearchParams } from 'react-router-dom'
// import { Friend } from './Friend.jsx'

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

  const gotoProfile = (id) => {
    console.log(restHost)
    console.log(id, restHost)
    let restUrl = restHost.replace("localhost", "127.0.0.1")
    if (id.indexOf(`${restUrl}`) == 0) {
      let idArr = id.split("/")
      let authorId = idArr[idArr.length - 1]
      navigate(`/profile/${authorId}`)
    }
    console.log("nvm")
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
                <button className='friendDivButton' onClick={() => { navigate(`/Profile?authorID=${follower.id}`) }} rel="noreferrer noopener" target="_blank"> Visit Profile </button>
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


