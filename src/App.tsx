import { Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import RestaurantsView from 'pages/RestaurantsView';
import RestaurantAdmin from 'pages/Admin/Restaurants';
import RestaurantForm from 'pages/Admin/Restaurants/Form';
import Admin from 'pages/Admin';

function App() {

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/restaurantes' element={<RestaurantsView />} />
            <Route path='/admin/' element={<Admin></Admin>}>
                <Route path='restaurantes' element={<RestaurantAdmin />}/>
                <Route path='restaurantes/novo' element={<RestaurantForm />}/>
                <Route path='restaurantes/:id' element={<RestaurantForm />}/>
            </Route>
        </Routes>
    );
}

export default App;
