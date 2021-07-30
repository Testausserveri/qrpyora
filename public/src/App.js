import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LandingPage from "./pages/LandingPage/LandingPage";
import Bikes from "./pages/Bikes/Bikes";


function App() {
  return (
      <>
        <Router>
          <Switch>
            <Route exact path="/" render={(props) => <LandingPage {...props} />}/>
            <Route exact path="/bikes" render={(props) => <Bikes {...props} />}/>
          </Switch>
        </Router>
      </>
  );
}

export default App;
