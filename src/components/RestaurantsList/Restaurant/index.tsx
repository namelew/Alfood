import IRestaurant from 'interfaces/IRestaurant';
import Dish from '../Dish';
import styles from './Restaurant.module.scss';

interface RestaurantProps {
  restaurant: IRestaurant
}

const Restaurante = ({ restaurant }: RestaurantProps) => {

  return (<section className={styles.Restaurant}>
    <div className={styles.Title}>
      <h2>{restaurant.name}</h2>
    </div>
    <div>
      {restaurant.dishs?.map(item => <Dish dish={item} key={item.id} />)}
    </div>
  </section>)
}

export default Restaurante