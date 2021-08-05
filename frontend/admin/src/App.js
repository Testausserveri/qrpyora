import './App.css';
import {BrowserRouter as Router, Route, Switch, useLocation} from 'react-router-dom';
import GalleryPage from "./pages/Gallery/Gallery";
import BikePage from "./pages/Bike/Bike";
import Header from "./components/common/header/Header";

import { useState, useEffect } from 'react';
import api from './api/api';
import auth from './api/auth';
import QRModal from "./components/common/modal/QRModal";
import FlexCenter from "./components/common/center/FlexCenter";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [bikes, setBikes] = useState([]);
  const [ongoingSignIn, setOngoingSignIn] = useState(false);
  console.log('tests', [
    auth.getAuth()===null,
    auth.getAuth(),
    JSON.parse(localStorage.getItem('auth')),
    localStorage.getItem('auth')
  ]);
  
  const [passwordPrompt, setPasswordPrompt] = useState(auth.getAuth()===null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  async function loadBikes() {
    setBikes(await api.getAllBikes());
  }



  useEffect(() => {
    loadBikes();
  }, [])

  async function signIn() {
    if (ongoingSignIn)
      return;
    setOngoingSignIn(true);
    api.checkAuth({username, password}).then(result => {
      setOngoingSignIn(false);
      if (result) {
        auth.saveAuth({username, password});
        setPasswordPrompt(false);
      }
    }).catch(err => {
      setOngoingSignIn(false);
      alert(err);
    })
  }


  return (
      <>
        <Router basename="/admin/">
          <ScrollToTop />
          <Header />
          <Switch>
            <Route exact path="/" render={() => <GalleryPage bikes={bikes} />}/>
            <Route path="/bikes/:bikeId" render={() => <BikePage bikes={bikes} />} />
            <Route path='*' exact={true} render={() => <NotFoundPage />} />
          </Switch>
          <QRModal isOpen={passwordPrompt} title={"Kirjaudu sisään"} action={"Kirjaudu"} actionCallback={signIn} onModalClose={()=>{setPasswordPrompt(false)}}>
            {ongoingSignIn===true ? <>
              <FlexCenter>
                <div className={"spinner"}/>
              </FlexCenter>
            </> : <>
              <input value={username} type={"text"} id={"username"} placeholder={"Käyttäjänimi"} onInput={e => setUsername(e.target.value)}/>
              <input value={password} type={"password"} id={"password"} placeholder={"Salasana"} onInput={e => setPassword(e.target.value)}/>
            </>}

          </QRModal>
        </Router>
      </>
  );
}

export default App;
