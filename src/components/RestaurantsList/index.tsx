import IRestaurant from 'interfaces/IRestaurant';
import style from './RestaurantsList.module.scss';
import Restaurant from './Restaurant';
import { useEffect, useState } from 'react';
import axios from 'axios';

const RestaurantsList = () => {

    const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/restaurantes/').then( (response) => {
            setRestaurants(response.data.results);
            console.log(restaurants);
        }).catch( (error) => {
            console.log(error);
        });
    }, []);

    return (<section className={style.RestaurantsList}>
        <h1>Os restaurants mais <em>bacanas</em>!</h1>
        {restaurants?.map(item => <Restaurant restaurant={item} key={item.id} />)}
    </section>);
};

export default RestaurantsList;