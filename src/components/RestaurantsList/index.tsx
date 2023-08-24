import IRestaurant from 'interfaces/IRestaurant';
import style from './RestaurantsList.module.scss';
import Restaurant from './Restaurant';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IPager } from 'interfaces/IPager';

const RestaurantsList = () => {

    const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
    const [nextPage, setNextPage] = useState('');

    useEffect(() => {
        axios.get<IPager<IRestaurant>>('http://localhost:8000/api/v1/restaurantes/').then( (response) => {
            setRestaurants(response.data.results);
            setNextPage(response.data.next);
        }).catch( (error) => {
            console.log(error);
        });
    }, []);

    const seeMore = () => {
        axios.get<IPager<IRestaurant>>(nextPage).then( (response) => {
            setRestaurants([...restaurants,...response.data.results]);
            setNextPage(response.data.next);
        }).catch( (error) => {
            console.log(error);
        });
    };

    return (<section className={style.RestaurantsList}>
        <h1>Os restaurants mais <em>bacanas</em>!</h1>
        {restaurants?.map(item => <Restaurant restaurant={item} key={item.id} />)}
        {nextPage && <button onClick={seeMore}>ver mais</button>}
    </section>);
};

export default RestaurantsList;