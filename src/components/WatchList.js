
import Card from './Card';
import { useSelector } from 'react-redux';

function WatchList() {

  const watchList = useSelector((state)=>state.watchList.data)

 
 return (
  <div>{
  watchList.length > 0 ? watchList.map((movie)=><Card key={movie.id} movie={movie}/>) :""
  }</div>
 )
}

export default WatchList;
