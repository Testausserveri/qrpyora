import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LandingPage from "./components/LandingPage/LandingPage";


function App() {
  return (
      <>
        <Router>
          <Switch>
            <Route exact path="/" render={(props) => <LandingPage {...props} />}/>
          </Switch>
        </Router>
      </>
  );
}

export default App;
