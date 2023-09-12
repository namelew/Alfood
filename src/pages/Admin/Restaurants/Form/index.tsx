import { Button, TextField } from '@mui/material';
import axios from 'axios';
import IRestaurant from 'interfaces/IRestaurant';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RestaurantForm = () => {
    const parameters = useParams();
    const [name, setName] = useState('');

    useEffect(() => {
        if (parameters.id) {
            axios.get<IRestaurant>(`http://localhost:8000/api/v2/restaurantes/${parameters.id}/`)
                .then((response) => setName(response.data.nome)); 
        }
    }, [parameters]);

    const onFormSumit = ( event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (parameters.id) {
            axios.put(`http://localhost:8000/api/v2/restaurantes/${parameters.id}/`, { nome: name })
                .then( () => alert('Restaurante atualizado com sucesso') )
                .catch( (error) => alert(`Falha ao atualizar nome do restaurante. ${error}`) );
        } else {
            axios.post('http://localhost:8000/api/v2/restaurantes/', { nome: name })
                .then( () => alert('Restaurante cadastrado com sucesso') )
                .catch( (error) => alert(`Falha ao cadastrar restaurante. ${error}`) );
        }
    };

    return (
        <form onSubmit={onFormSumit}>
            <TextField
                value={name}
                onChange={event => setName(event.target.value)}
                label='Nome do Restaurante'
                variant='standard'
            />
            <Button type='submit' variant='outlined'>Salvar</Button>
        </form>
    );
};

export default RestaurantForm;