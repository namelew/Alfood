import IRestaurant from 'interfaces/IRestaurant';
import Dish from '../Dish';
import styles from './Restaurant.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import IDish from 'interfaces/IDish';

interface RestaurantProps {
  restaurant: IRestaurant
}

const Restaurant = ({ restaurant }: RestaurantProps) => {
    const [dishs, setDishs] = useState<IDish[]>();

    useEffect(() => {
        axios.get<IDish[]>(`http://localhost:8000/api/v1/restaurantes/${restaurant.id}/pratos/`)
            .then( response  => {
                setDishs(response.data);
            });
    }, [restaurant.id]);

    return (<section className={styles.Restaurant}>
        <div className={styles.Title}>
            <h2>{restaurant.nome}</h2>
        </div>
        <div>
            {dishs?.map(item => <Dish dish={item} key={item.id} />)}
        </div>
    </section>);
};

export default Restaurant;