import { Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import RestaurantsView from 'pages/RestaurantsView';
import RestaurantAdmin from 'pages/Admin/Restaurants';
import RestaurantForm from 'pages/Admin/Restaurants/Form';

function App() {

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/restaurantes' element={<RestaurantsView />} />
            <Route path='/admin/restaurantes' element={<RestaurantAdmin />}/>
            <Route path='/admin/restaurantes/novo' element={<RestaurantForm />}/>
        </Routes>
    );
}

export default App;
