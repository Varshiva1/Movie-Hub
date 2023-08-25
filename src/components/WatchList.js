import React,{useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import { addToWatchList } from '../store/slice';
import Card from './Card';

function WatchList(props) {

  const watchList = useSelector((state)=>state.watchList.data)
  console.log(watchList)

//   const [fav,setFav]=useState([])
//  let movies=[
//   {
//     "adult":false,
// "backdrop_path": "/nHf61UzkfFno5X1ofIhugCPus2R.jpg",
// "id": 346698,
// "media_type": "movie",
// "original_language": "en",
// "original_title": "Barbie",
// "overview": "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
// "popularity": 3087.959,
// "poster_path": "/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
// "release_date": "2023-07-19",
// "title": "Barbie",
// "video": false,
// "vote_average": 7.496,
// "vote_count": 2516
//   }
//  ]
//  useEffect(()=>{
//   let moviefromlocal=localStorage.getItem("imdb")
//   moviefromlocal=JSON.parse(moviefromlocal)
//   setFav(moviefromlocal)
//  },[])

 
 return (
  <div>{
  watchList.length > 0 ? watchList.map((movie)=><Card key={movie.id} movie={movie}/>) :""
  }</div>
 )
}

export default WatchList;
