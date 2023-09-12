import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { http } from '../../../../http';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IDish from 'interfaces/IDish';
import ITag from 'interfaces/ITag';
import IRestaurant from 'interfaces/IRestaurant';

const DishForm = () => {
    const parameters = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('');
    const [restaurant, setRestaurant] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const [tags, setTags] = useState<ITag[]>();
    const [restaurants, setRestaurants] = useState<IRestaurant[]>();

    useEffect(() => {
        http.get<{tags: ITag[]}>('tags/')
            .then( response => setTags(response.data.tags) );
        http.get<IRestaurant[]>('restaurantes/')
            .then( response => setRestaurants(response.data) );

        if (parameters.id) {
            http.get<IDish>(`pratos/${parameters.id}/`)
                .then((response) => {
                    setName(response.data.nome);
                    setDescription(response.data.descricao);
                    setTag(response.data.tag);
                }); 
        }
    }, [parameters]);

    const selectFile = ( event:React.ChangeEvent<HTMLInputElement> ) => {
        if ( event.target.files?.length ){
            setImage(event.target.files[0]);
        } else {
            setImage(null);
        }
    };

    const onFormSumit = ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('nome', name);
        formData.append('descricao', description);
        formData.append('tag', tag);
        formData.append('restaurante', restaurant);

        if (image) {
            formData.append('imagem', image);
        }

        if (parameters.id) {
            http.put(`pratos/${parameters.id}/`, { nome: name })
                .then( () => alert('Prato atualizado com sucesso') )
                .catch( (error) => alert(`Falha ao atualizar nome do prato. ${error}`) );
        } else {
            http.request({
                url: 'pratos/',
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            })
                .then( () => {
                    setName('');
                    setDescription('');
                    setRestaurant('');
                    setTag('');
                    alert('Prato cadastrado com sucesso');
                } )
                .catch( (error) => alert(`Falha ao cadastrar prato. ${error}`) );
        }
    };

    return (
        <Box sx={ { display:'flex', flexDirection:'column', alignItems:'center', flexGrow: 1} }>
            <Typography component='h1' variant='h6'>Formulário de Prato</Typography>
            <Box component="form" sx={{ width:'100%' }} onSubmit={onFormSumit}>
                <TextField
                    value={name}
                    onChange={event => setName(event.target.value)}
                    label='Nome do Prato'
                    variant='standard'
                    fullWidth
                    margin='dense'
                    required
                />
                <TextField
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                    label='Descrição do Prato'
                    variant='standard'
                    fullWidth
                    margin='dense'
                    required
                />
                <FormControl margin='dense' fullWidth required>
                    <InputLabel id='select-tag'>Tag</InputLabel>
                    <Select labelId='select-tag' value={tag} onChange={event => setTag(event.target.value)}>
                        {tags?.map(tag => <MenuItem key={tag.id} value={tag.value}>{tag.value}</MenuItem>)}
                    </Select>
                </FormControl>

                <FormControl margin='dense' fullWidth required>
                    <InputLabel id='select-restaurant'>Restaurante</InputLabel>
                    <Select labelId='select-restaurant' value={restaurant} onChange={event => setRestaurant(event.target.value)}>
                        {restaurants?.map(restaurant => <MenuItem key={restaurant.id} value={restaurant.id}>{restaurant.nome}</MenuItem>)}
                    </Select>
                </FormControl>

                <input type="file" onChange={selectFile}/>

                <Button sx={{marginTop: 1}} type='submit' variant='outlined' fullWidth >Salvar</Button>
            </Box>
        </Box>
    );
};

export default DishForm;  