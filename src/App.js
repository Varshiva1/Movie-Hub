import 'tailwindcss/tailwind.css';
import './App.css';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className='flex border space-x-8 items-center pl-4 py-5'>
     <h3 className='text-blue-400'>Movies</h3>
     <h3 className='text-blue-400'>Watchlist</h3>

    </div>
  );
}

export default App;
