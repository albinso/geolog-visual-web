
import './App.css';
import MapView from './MapView.tsx';
import { useLoadScript } from '@react-google-maps/api';

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  return (
    <div className="App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (<MapView />)
      }
    </div>
  );
}

export default App;
