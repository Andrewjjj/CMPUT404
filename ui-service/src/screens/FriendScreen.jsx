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
// import { Friend } from './Friend.jsx'

export const FriendScreen = (props) => {
  const [authors, setAuthors] = useState([]);
  const [friends, setFriends] = useState([]);
  // const [followers, setFollowers] = useState([]);
  // const [friendRequests, setFriendRequests] = useState([]);
  const [foreignAuthors, setForeignAuthors] = useState([])
  const [host, setHost] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [token, setToken] = useState("")

  const restHost = useStoreState((state) => state.restHost)
  const authorInfo = useStoreState((state) => state.author)

  const navigate = useNavigate()

  useEffect(() => {
    // fetchFollowers();
    // fetchFriendRequests();
    fetchAuthors()
  }, [])

  // const fetchFollowers = async () => {
  //   console.log(authorInfo)
  //   try {
  //     let response = await axios.get(`${restHost}/author/${authorInfo.AuthorID}/followers`)
  //     let followers = response.data.items;
  //     console.log("friends", followers)
  //     setFollowers(followers);
  //   }
  //   catch (err) {
  //     console.log(err)
  //     alert(err)
  //   }
  // }

  // const fetchFriendRequests = async () => {
  //   try {
  //     let response = await axios.get(`${restHost}/author/${authorInfo.AuthorID}/friend_request`)
  //     let friendRequests = response.data;
  //     // console.log(friendRequests)
  //     setFriendRequests(friendRequests)
  //     // setFriends(friends);
  //   }
  //   catch (err) {
  //     console.log(err)
  //     alert(err)
  //   }
  // }

  const fetchAuthors = async () => {
    try {
      let response = await axios.get(`${restHost}/authors`)
      let authors = response.data.items;

      let friendResponse = await axios.get(`${restHost}/author/${authorInfo.AuthorID}/friends`)
      let friends = friendResponse.data
      // console.log(friends)

      // console.log(authors)
      // setFriendRequests()
      let authorArr = authors.filter(e => e.id != `${restHost.replace("localhost", "127.0.0.1")}/author/${authorInfo.AuthorID}`)
      // let friendsIdArr = friends.map(e => e.id)
      authorArr = authorArr.filter(e => !friends.map(e => e.id).includes(e.id))
      console.log(friends, authorArr)
      setFriends(friends)
      setAuthors(authorArr)

      // console.log(friendRequests)
      // setFriends(friends);
    }
    catch (err) {
      console.log(err)
      alert(err)
    }
  }


  /*
  //Fetch friends from json server
  useEffect( () => {
    const getFriends= async () => {
      const friendsFromServer= await fetchFriends()
      setFriends(friendsFromServer)
    }
    
    getFriends()
  }, [])

  const fetchFriends= async () =>
    {
      const result = await fetch('http://localhost:5000/Friends') //Temporary Server
      const data = await result.json()
      return data
    }*/
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


  // const ModalComponent = () => {
  //   return (
  //     <Modal show={show} onHide={handleClose}>
  //       <Modal.Header closeButton>
  //         <Modal.Title>{modalHeader}</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>{modalContent}</Modal.Body>
  //       <Modal.Footer>
  //         <Button variant="secondary" onClick={handleClose}>
  //           Close
  //         </Button>
  //       </Modal.Footer>
  //     </Modal>
  //   )
  // }

//   useEffect(() => {
//     // axios.interceptors.request.use(request => {
//     //     console.log('Starting Request', request)
//     //     return request
//     // })
//     console.log(authors)
// }, [])

  const connectToForeignHostHandler = async () => {
      try {

          let token = btoa(`${username}:${password}`)
          setToken(token)
          let response = await axios.get(host, {
              headers: {
                  "Authorization": `Basic ${token}`
              }
          })
          // console.log(response.data.items)
          setForeignAuthors(response.data.items)
      }
      catch (err) {
          console.log(err)
          alert(err)
      }
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
      <div>
        <div className='headerc'>
          <div><h1>Authors (Non-friends)</h1></div>
        </div>
      </div>
      <>
        {authors.map((follower) => (
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
      <div>
        <div className='headerc'>
          <div><h1>Foreign Authors</h1></div>
        </div>
      </div>
      <div className="m-5">
        {/* <ModalComponent /> */}
        {/* <Button onClick={() => { navigator("/Home") }}>Go Back</Button> */}
        <div className="row border mx-5 my-2 text-white">
          Get Authors URL: <input type="text" value={host} onInput={(e) => { setHost(e.currentTarget.value) }} />
        </div>
        <div className="row border mx-5 my-2 text-white">
          Username: <input type="text" value={username} onInput={(e) => { setUsername(e.currentTarget.value) }} />
        </div>
        <div className="row border mx-5 my-2 text-white">
          Password: <input type="text" value={password} onInput={(e) => { setPassword(e.currentTarget.value) }} />
        </div>
        <div className="row">
          <div className="col text-center">
            <Button onClick={connectToForeignHostHandler}>Get all authors!</Button>
          </div>
        </div>
        <hr className="my-2" />
        
      </div>
      <>
        {foreignAuthors.map((follower) => (
          <div className='friend'>
            <div className='friendDivRight'>
              <img className='profileImage' src={follower.profileImage} alt=""></img>
              <h4>{follower.displayName}</h4>
              {/* <p>{friend.type}</p> */}
            </div>
            <div className='friendDivLeft'>
              <div>
                <button className='friendDivButton' onClick={() => { navigate(`/Profile?authorID=${follower.id}&token=${token}`) }} rel="noreferrer noopener" target="_blank"> Visit Profile </button>
              </div>
              <div>
                <button className='friendDivButton' onClick={() => { openInNewTab(follower.github) }} rel="noreferrer noopener" target="_blank" target="_blank"> Visit Github </button>
              </div>
            </div>

          </div>
          // <Friend key = {friend.id} friend={friend} />
        ))}
      </>
      {/* <List friends={friends} /> */}

    </div>
  )
}


