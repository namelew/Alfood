import { Box, Button, TextField, Typography } from '@mui/material';
import { http } from '../../../../http';
import IRestaurant from 'interfaces/IRestaurant';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RestaurantForm = () => {
    const parameters = useParams();
    const [name, setName] = useState('');

    useEffect(() => {
        if (parameters.id) {
            http.get<IRestaurant>(`restaurantes/${parameters.id}/`)
                .then((response) => setName(response.data.nome)); 
        }
    }, [parameters]);

    const onFormSumit = ( event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (parameters.id) {
            http.put(`restaurantes/${parameters.id}/`, { nome: name })
                .then( () => alert('Restaurante atualizado com sucesso') )
                .catch( (error) => alert(`Falha ao atualizar nome do restaurante. ${error}`) );
        } else {
            http.post('restaurantes/', { nome: name })
                .then( () => alert('Restaurante cadastrado com sucesso') )
                .catch( (error) => alert(`Falha ao cadastrar restaurante. ${error}`) );
        }
    };

    return (
        <Box sx={ { display:'flex', flexDirection:'column', alignItems:'center'} }>
            <Typography component='h1' variant='h6'>Formulário de Restaurante</Typography>
            <Box component="form" onSubmit={onFormSumit}>
                <TextField
                    value={name}
                    onChange={event => setName(event.target.value)}
                    label='Nome do Restaurante'
                    variant='standard'
                    fullWidth
                    required
                />
                <Button sx={{marginTop: 1}} type='submit' variant='outlined' fullWidth >Salvar</Button>
            </Box>
        </Box>
    );
};

export default RestaurantForm;