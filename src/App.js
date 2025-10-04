import "tailwindcss/tailwind.css";
import "./App.css";
import NavBar from "./components/NavBar";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import WatchList from "./components/WatchList";
import List from "./components/Celebritylist";
import MovieDetail from "./components/MovieDetail";
import StreamingHistory from "./components/StreamingHistory";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies />
              </>
            }
          ></Route>

          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/Celebritylist" element={<List />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/streaming-history" element={<StreamingHistory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
