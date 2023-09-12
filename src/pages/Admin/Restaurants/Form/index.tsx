import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

const RestaurantForm = () => {
    const [name, setName] = useState('');

    const onFormSumit = ( event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        axios.post('http://localhost:8000/api/v2/restaurantes/', { nome: name }).then(() => {
            alert('Restaurante cadastrado com sucesso');
        }).catch( (error) => {
            alert(`Falha ao cadastrar restaurante. ${error}`);
        }
        );
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