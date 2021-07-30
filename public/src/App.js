import './App.css';
import {BrowserRouter as Router, Route, Switch, useLocation} from 'react-router-dom';
import FrontPage from "./pages/FrontPage/FrontPage";
import FaqPage from "./pages/Faq/Faq";
import GalleryPage from "./pages/Gallery/Gallery";
import BikePage from "./pages/Bike/Bike";
import Header from "./components/common/header/Header";

import { useState, useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [bikes] = useState([
    {
        bikeId: 1,
        city: 'Lappeenranta',
        locationName: 'Satamatori',
        previewPhotos: [ '503', '504', '505', '506' ],
        photoCount: 420,
        lat: 61.06213413678233, 
        lon: 28.190886072212503
    },
    {
        bikeId: 2,
        city: 'Helsinki',
        locationName: 'Kamppi',
        previewPhotos: [ '550', '551', '555', '566' ],
        photoCount: 150,
        lat: 60.16989441221331, 
        lon: 24.936230746565478
    },
  ]);

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
        </Router>
      </>
  );
}

export default App;
