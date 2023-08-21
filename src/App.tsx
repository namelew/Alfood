import { Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import RestaurantsView from 'pages/RestaurantsView';

function App() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurantes" element={<RestaurantsView />} />
        </Routes>
    );
}

export default App;
