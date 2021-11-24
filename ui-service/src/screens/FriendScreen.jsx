import React from 'react'
import { Link } from "react-router-dom";
import {Header} from '../components/Header'
import {List} from '../components/List'
import {useState, useEffect} from 'react'
import axios from 'axios';

export const FriendScreen = (props) => {
  const [Friends, setFriends]= useState([]);
  
  useEffect(() => {
    fetchFriends();
  }, [])

  const fetchFriends = async () => {
    try {
      let response = await axios.get("http://localhost:8080/service/author/")
      let friends = response.data;
      console.log(friends);

      setFriends(friends);
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

    

  return (
    <div className="container">
      <div>
      <Header title= "Friends" />
      
      </div>
      <List friends={Friends} />

      
    </div>
    )
    }


