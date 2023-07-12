import 'tailwindcss/tailwind.css';
import './App.css';
import NavBar from './components/NavBar';
import Banner from './components/Banner';
import Movies from './components/Movies';
import WatchList from './components/WatchList';

import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
      <NavBar/>

      <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <>
      <Banner/>
      <Movies/>
          </>
        }>
        </Route>

   <Route path="/watchlist" element={<WatchList/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
