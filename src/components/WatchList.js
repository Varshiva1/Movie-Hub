
import Card from './Card';
import { useSelector } from 'react-redux';

function WatchList() {

  const watchList = useSelector((state)=>state.watchList.data)

 
 return (// grid-cols-[repeat(auto-fill,minmax(250px,1fr))] used for auto responsive
  <div className='w-[80%] m-auto py-4 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-x-2 gap-y-4'>{
  watchList.length > 0 ? watchList.map((movie)=><Card key={movie.id} movie={movie}/>) :""
  }</div>
 )
}

export default WatchList;
