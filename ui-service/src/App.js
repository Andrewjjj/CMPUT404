import logo from './logo.svg';
import './App.css';
import { MainScreen } from "./screens/MainScreen"
import { PostScreen } from "./screens/PostScreen"
import { PostOutsourceScreen } from "./screens/PostOutsourceScreen"
import { SiteAdminScreen } from "./screens/SiteAdminScreen"
import { InboxScreen } from "./screens/InboxScreen"
import { LandingScreen } from "./screens/LandingScreen"
import { FriendScreen } from "./screens/FriendScreen"
import { AdminScreen } from './screens/AdminScreen'
import { ProfilePage } from "./screens/ProfilePage"
import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
import { LoginUserScreen, LoginAdminScreen } from './screens/LoginScreen';
import { RegistrationScreen } from './screens/RegistrationScreen';
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useEffect } from 'react';
import { AuthorForeignScreen } from './screens/AuthorForeignScreen';
function App() {
  const isLoggedIn = useStoreState((state) => state.isLoggedIn)
  const isLoggedInAdmin = useStoreState((state) => state.isLoggedInAdmin)
  const restHost = useStoreState((state) => state.restHost)
  useEffect(() => {
    console.log(restHost)
    // setRestHost("http://localhost:8080")
  }, [])

  return (
      <BrowserRouter>
        <Routes>
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
          {/* <Route element={LandingScreen}/> */}
          <Route
            path="/Posts"
            name="View Post Screen"
            element={<PostScreen />}
            />
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
          {/* <Route
            path="/Friends"
            name="Friend Screen"
            element={<FriendScreen />}/> */}
          <Route
            path="/Profile"
            name="Register Screen"
            render={<ProfilePage /> }/>
          { isLoggedInAdmin ? (
            <>
            <Route
              path="/SiteAdmin"
              name="Register Screen"
              element={<SiteAdminScreen />}/>
            <Route
              path="/Admin"
              name="Node Screen"
              element={<AdminScreen />}/>
            </>
          ) : <></>}
          <Route 
            path="/Home"
            name="HomeScreen"
            element={<MainScreen />}/>
          <Route 
            path="*"
            name="main"
            element={<LandingScreen />}/>

        </Routes>
      </BrowserRouter>
  );
}

export default App;
