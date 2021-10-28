import React from 'react'
import { Link } from "react-router-dom";
import {Header} from '../components/Header'
import {List} from '../components/List'
import {useState, useEffect} from 'react'

export const FriendScreen = (props) => {
    const [Friends, setFriends]= useState([
      {
        "type":"author",
        "id":"http://127.0.0.1:5454/author/1d698d25ff008f7538453c120f581471",
        "url":"http://127.0.0.1:5454/author/1d698d25ff008f7538453c120f581471",
        "host":"http://127.0.0.1:5454/",
        "displayName":"Greg Johnson",
        "github": "http://github.com/gjohnson",
        "profileImage": "https://i.imgur.com/k7XVwpB.jpeg"
    },
    {
      "type":"author",
      "id":"http://127.0.0.1:5454/author/1d698d25ff008f7538453c120f581471",
      "url":"http://127.0.0.1:5454/author/1d698d25ff008f7538453c120f581471",
      "host":"http://127.0.0.1:5454/",
      "displayName":"Treg Johnson",
      "github": "http://github.com/gjohnson",
      "profileImage": "https://i.imgur.com/k7XVwpB.jpeg"
  },
  {
    "type":"author",
    "id":"http://127.0.0.1:5454/author/1d698d25ff008f7538453c120f581471",
    "url":"http://127.0.0.1:5454/author/1d698d25ff008f7538453c120f581471",
    "host":"http://127.0.0.1:5454/",
    "displayName":"Kreg Johnson",
    "github": "http://github.com/gjohnson",
    "profileImage": "https://i.imgur.com/k7XVwpB.jpeg"
  },
  {
    "type":"author",
    "id":"http://127.0.0.1:5454/author/1d698d25ff008f7538453c120f581471",
    "url":"http://127.0.0.1:5454/author/1d698d25ff008f7538453c120f581471",
    "host":"http://127.0.0.1:5454/",
    "displayName":"Greg Johnson",
    "github": "http://github.com/gjohnson",
    "profileImage": "https://i.imgur.com/k7XVwpB.jpeg"
  },
  {
    "type":"author",
    "id":"http://127.0.0.1:5454/author/1d698d25ff008f7538453c120f581471",
    "url":"http://127.0.0.1:5454/author/1d698d25ff008f7538453c120f581471",
    "host":"http://127.0.0.1:5454/",
    "displayName":"Greg Johnson",
    "github": "http://github.com/gjohnson",
    "profileImage": "https://i.imgur.com/k7XVwpB.jpeg"
  }]) // Temporary data

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

    

  return (
    <div className="container">
      <div>
      <Header title= "Friends" />
      
      </div>
      <List friends={Friends} />

      
    </div>
    )
    }


