import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Containers
import { LandingPage, ProfilePage } from "./containers";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact={true} component={LandingPage} />
          <Route path="/:username" exact={true} component={ProfilePage} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
