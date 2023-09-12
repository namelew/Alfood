import IDish from 'interfaces/IDish';
import { TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { http } from '../../../http';
import { Link } from 'react-router-dom';

const DishsAdmin = () => {
    const [dishs, setDishs] = useState<IDish[]>();

    useEffect(() => {
        http.get<IDish[]>('pratos/')
            .then( response => setDishs(response.data) );
    }, []);

    const Delete = ( dish: IDish ) => {
        http.delete(`pratos/${dish.id}/`)
            .then(() => {
                setDishs(dishs?.filter(item => item.id !== dish.id));
                alert('Prato deletado com sucesso');
            })
            .catch(( error ) => alert(`Falha ao deletar prato. ${error}`));
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
                            Tag
                        </TableCell>
                        <TableCell>
                            Imagem
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
                    {dishs?.map( dish => (
                        <TableRow key={dish.id}>
                            <TableCell>
                                {dish.nome}
                            </TableCell>
                            <TableCell>
                                {dish.tag}
                            </TableCell>
                            <TableCell>
                                <a href={dish.imagem} target='_blank' rel='noreferrer'>[Ver imagem]</a>
                            </TableCell>
                            <TableCell>
                                [ <Link to={`/admin/pratos/${dish.id}`}>Editar</Link> ]
                            </TableCell>
                            <TableCell>
                                <Button variant='outlined' color='error' onClick={() => Delete(dish)}>EXCLUIR</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DishsAdmin;