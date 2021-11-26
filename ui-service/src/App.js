import logo from './logo.svg';
import './App.css';
import { MainScreen } from "./screens/MainScreen"
import { PostScreen } from "./screens/PostScreen"
import { InboxScreen } from "./screens/InboxScreen"
import { LandingScreen } from "./screens/LandingScreen"
import { FriendScreen } from "./screens/FriendScreen"
import { AdminScreen } from './screens/AdminScreen'
import { ProfilePage } from "./screens/ProfilePage"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { LoginUserScreen, LoginAdminScreen } from './screens/LoginScreen';
import { RegistrationScreen } from './screens/RegistrationScreen';
import { useStoreState } from 'easy-peasy'
function App() {
  const isLoggedIn = useStoreState((state) => state.isLoggedIn)

  return (
      <BrowserRouter>
        <Switch>
          {isLoggedIn ? 
          <>
          <Route
            path="/Post"
            name="View Post Screen"
            component={PostScreen} />
          <Route
            path="/Inbox"
            name="Inbox Screen"
            component={InboxScreen} />
          <Route
            path="/Friends"
            name="Friend Screen"
            component={FriendScreen} />
          <Route
            path="/Profile"
            name="Register Screen"
            component={ProfilePage} />
          <Route
            path="/"
            component={MainScreen} />
          </>
          :
          <>
          <Route
            path="/Admin"
            name="Admin Screen"
            component={AdminScreen} />
          <Route
            path="/LoginUser"
            name="Login Screen"
            component={LoginUserScreen} />
          <Route
            path="/LoginAdmin"
            name="Login Screen"
            component={LoginAdminScreen} />
          <Route
            path="/Register"
            name="Register Screen"
            component={RegistrationScreen} />
          <Route
            path="/"
            component={LandingScreen} />
          </>
          }
        </Switch>
      </BrowserRouter>
  );
}

export default App;
