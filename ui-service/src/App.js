import logo from './logo.svg';
import './App.css';
import { MainScreen } from "./screens/MainScreen"
import { PostOutsourceScreen } from "./screens/PostOutsourceScreen"
import { InboxScreen } from "./screens/InboxScreen"
import { LandingScreen } from "./screens/LandingScreen"
import { FriendScreen } from "./screens/FriendScreen"
import { AdminScreen } from './screens/AdminScreen'
import { AdminAuthorScreen } from './screens/AdminAuthorScreen'
import { AdminCreateAuthorScreen} from './screens/AdminCreateAuthorScreen'
import { AdminFriendsScreen } from './screens/AdminFriendScreen'
import { AdminProfileScreen } from './screens/AdminProfileScreen'
import { ProfilePage } from "./screens/ProfilePage"
import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
import { LoginUserScreen, LoginAdminScreen } from './screens/LoginScreen';
import { RegistrationScreen } from './screens/RegistrationScreen';
import { useStoreActions, useStoreState, useStoreRehydrated } from 'easy-peasy'
import { useEffect } from 'react';
import { AuthorForeignScreen } from './screens/AuthorForeignScreen';
import { PostFeed } from './components/PostFeed';
import { ServerFeed} from './components/ServerFeed'

function App() {
  const isLoggedIn = useStoreState((state) => state.isLoggedIn)
  const isLoggedInAdmin = useStoreState((state) => state.isLoggedInAdmin)
  const restHost = useStoreState((state) => state.restHost)
  const setRestHost = useStoreActions((state) => state.setRestHost)
  const isRehydrated = useStoreRehydrated()
  
  useEffect(() => {
    // setRestHost("https://fast-chamber-90421.herokuapp.com")
    setRestHost("http://localhost:8080")
    console.log(restHost, isLoggedIn, isRehydrated)
  }, [])

  return (
    <>
      {isRehydrated ? (
        <BrowserRouter>
          {isLoggedIn ? 
          <MainScreen></MainScreen> : <></>
          }
          <Routes>
            {isLoggedIn ? (
              <>
              
              <Route
                path="/Author/Foreign"
                name="View Post Screen"
                element={<AuthorForeignScreen />}
                />
              <Route
                path="/Posts/Others"
                name="View Post Screen"
                element={<PostOutsourceScreen />}
                />
              <Route
                path="/Inbox"
                name="Inbox Screen"
                element={<InboxScreen />}/>
              <Route
                path="/Profile"
                name="Profile Screen"
                element={<ProfilePage /> }/>
              { <Route
                path="/Server"
                name="Server Screen"
                element={<ServerFeed /> }/> }
              <Route
                path="/Friends"
                name="Friend Screen"
                element={<FriendScreen />}/>
                <Route
                  path="*"
                  name="View Post Screen"
                  element={<PostFeed />}
                  />
              </>
            ) : <></>}
            { isLoggedInAdmin ? (
              <>
              <Route
                path="/Admin"
                name="Node Screen"
                element={<AdminScreen />}/>
              <Route
                path="/Admin/Authors"
                name="Admin Author Screen"
                element={<AdminAuthorScreen />}/>
              <Route
                path="/Admin/Authors/Friends"
                name="Admin View Friends Screen"
                element={<AdminFriendsScreen />}/>
              <Route
                path="/Admin/Authors/Profile"
                name="Admin View Profile Screen"
                element={<AdminProfileScreen />}/>
              <Route
                path="/Admin/Authors/Create"
                name="Admin Create Author Screen"
                element={<AdminCreateAuthorScreen />}/>
              </>
            ) : <></>}
            <Route
              path="/LoginUser"
              name="Login Screen"
              element={<LoginUserScreen />} />
            <Route
              path="/LoginAdmin"
              name="Login Screen"
              element={<LoginAdminScreen />} />
            <Route
              path="/Register"
              name="Register Screen"
              element={<RegistrationScreen />} />
            <Route 
              path="*"
              name="main"
              element={<LandingScreen />}/>

          </Routes>
        </BrowserRouter>
      ) : <div></div>}
    </> 
  );
}

export default App;
