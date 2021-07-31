import './App.css';
import {BrowserRouter as Router, Route, Switch, useLocation} from 'react-router-dom';
import FrontPage from "./pages/FrontPage/FrontPage";
import FaqPage from "./pages/Faq/Faq";
import GalleryPage from "./pages/Gallery/Gallery";
import BikePage from "./pages/Bike/Bike";
import Header from "./components/common/header/Header";
import Footer from './components/common/footer/Footer';

import { useState, useEffect } from 'react';
import api from './api/api';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [bikes, setBikes] = useState([]);

  async function loadBikes() {
    setBikes(await api.getAllBikes());
  }

  useEffect(() => {
    loadBikes();
  }, [])

  return (
      <>
        <Router>
          <ScrollToTop />
          <Header />
          <Switch>
            <Route exact path="/" render={() => <FrontPage bikes={bikes} />}/>
            <Route exact path="/gallery" render={() => <GalleryPage bikes={bikes} />}/>
            <Route exact path="/faq" render={() => <FaqPage />}/>
            <Route path="/bikes/:bikeId" render={() => <BikePage bikes={bikes} />} />
          </Switch>
          <Footer />
        </Router>
      </>
  );
}

export default App;
