import IRestaurant from 'interfaces/IRestaurant';
import { TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

const RestaurantAdmin = () => {
    const [restaurants, setRestaurants] = useState<IRestaurant[]>();

    useEffect(() => {
        axios.get<IRestaurant[]>('http://localhost:8000/api/v2/restaurantes/')
            .then( response => setRestaurants(response.data) );
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurants?.map( restaurant => (
                        <TableRow key={restaurant.id}>
                            <TableCell>
                                {restaurant.nome}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RestaurantAdmin;