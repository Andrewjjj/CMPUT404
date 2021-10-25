import logo from './logo.svg';
import './App.css';
import { MainScreen } from "./screens/MainScreen"
import { PostScreen } from "./screens/PostScreen"
import { InboxScreen } from "./screens/InboxScreen"
import { FriendScreen } from "./screens/FriendScreen"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/Post"
          name="View Post Screen"
          component={PostScreen} />
        {/* render={(props) => <PostScreen {...props} />} /> */}
        <Route
          path="/Inbox"
          name="Inbox Screen"
          component={InboxScreen} />

        {/* render={(props) => <InboxScreen {...props} />} /> */}
        <Route
          path="/Friends"
          name="Friend Screen"
          component={FriendScreen} />

        {/* render={(props) => <FriendScreen {...props} />} /> */}

        <Route
          component={MainScreen} />

        {/* render={(props) => <MainScreen {...props} />} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
