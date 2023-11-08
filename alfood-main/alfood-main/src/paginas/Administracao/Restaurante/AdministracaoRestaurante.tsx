import { useEffect, useState } from "react"
import IRestaurante from "../../../interfaces/IRestaurante"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Link } from "react-router-dom"
import http from "../../../http"

const AdministracaoRestaurante = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    const excluir = (restauranteExcluido: IRestaurante) => {
        http.delete(`restaurantes/${restauranteExcluido.id}/`)
        .then(() => {
            const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteExcluido.id)
            setRestaurantes([ ...listaRestaurante])
            alert("Restaurante deletado com sucesso!")
        })
    }
    
    useEffect(() => {
        http.get('restaurantes/')
        .then(resposta => setRestaurantes(resposta.data))
    }, [])


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
                {restaurantes.map(restaurante => <TableRow key={restaurante.id}>
                    <TableCell>
                        {restaurante.nome}
                    </TableCell>
                    <TableCell>
                        [ <Link to={`/admin/restaurantes/${restaurante.id}`}>editar</Link> ]
                    </TableCell>
                    <TableCell>
                        <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>
                            Excluir
                        </Button>
                    </TableCell>
                </TableRow>)}
            </TableBody>
            </Table>
        </TableContainer>
    )


}

export default AdministracaoRestaurante