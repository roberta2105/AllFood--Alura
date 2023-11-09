import { Box, Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import IRestaurante from "../../../interfaces/IRestaurante"
import 'bootstrap/dist/css/bootstrap.min.css';
import http from "../../../http"


const FormularioRestaurante = () => {

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [parametros])

    // Função para lidar com o envio do formulário
    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => { //é uma maneira de indicar que a função aoSubmeterForm espera receber um evento de formulário HTML quando é chamada
        evento.preventDefault() // Impede o comportamento padrão do formulário de atualizar a página

        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, { //Faz uma requisição para api salvar um novo objeto, passando o nome do novo obj.
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante atualizado com sucesso!")
                })
        } else {
            http.post('restaurantes/', { //Faz uma requisição para api salvar um novo objeto, passando o nome do novo obj.
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante cadastrado com sucesso!")
                })
        }
    }

    return (

        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Typography sx={{ marginTop: 8 }} component="h1" variant="h6">Formulário de Restaurantes</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <TextField
                    value={nomeRestaurante}
                    onChange={evento => setNomeRestaurante(evento.target.value)}
                    label="Nome do Restaurante"
                    variant="standard"
                    fullWidth
                    required
                />
                <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>Enviar</Button>
            </Box>
        </Box>

    )
}

export default FormularioRestaurante