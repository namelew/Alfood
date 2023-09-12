import IRestaurant from 'interfaces/IRestaurant';
import { TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { http } from '../../../http';
import { Link } from 'react-router-dom';

const RestaurantAdmin = () => {
    const [restaurants, setRestaurants] = useState<IRestaurant[]>();

    useEffect(() => {
        http.get<IRestaurant[]>('restaurantes/')
            .then( response => setRestaurants(response.data) );
    }, []);

    const Delete = ( restaurant: IRestaurant ) => {
        http.delete(`restaurantes/${restaurant.id}/`)
            .then(() => {
                setRestaurants(restaurants?.filter(item => item.id !== restaurant.id));
                alert('Restaurante deletado com sucesso');
            })
            .catch(( error ) => alert(`Falha ao deletar restaurante. ${error}`));
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurants?.map( restaurant => (
                        <TableRow key={restaurant.id}>
                            <TableCell>
                                {restaurant.nome}
                            </TableCell>
                            <TableCell>
                                [ <Link to={`/admin/restaurantes/${restaurant.id}`}>Editar</Link> ]
                            </TableCell>
                            <TableCell>
                                <Button variant='outlined' color='error' onClick={() => Delete(restaurant)}>EXCLUIR</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RestaurantAdmin;