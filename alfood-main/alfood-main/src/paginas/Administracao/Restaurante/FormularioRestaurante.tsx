import { Button, TextField } from "@mui/material"
import axios from "axios"
import { useState } from "react"

const FormularioRestaurante = () => {

const [nomeRestaurante, setNomeRestaurante] = useState('')

// Função para lidar com o envio do formulário
const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => { //é uma maneira de indicar que a função aoSubmeterForm espera receber um evento de formulário HTML quando é chamada
    evento.preventDefault() // Impede o comportamento padrão do formulário de atualizar a página
    axios.post('http://localhost:8000/api/v2/restaurantes/', { //Faz uma requisição para api salvar um novo objeto, passando o nome do novo obj.
        nome: nomeRestaurante
    })
    .then(() => {
        alert("Restaurante cadastrado com sucesso!")
    })
}


    return (<form onSubmit={aoSubmeterForm}>
        <TextField value={nomeRestaurante}
            onChange={evento => setNomeRestaurante(evento.target.value)}
            label="Nome do Restaurante"
            variant="standard" />
        <Button type="submit" variant="outlined">Enviar</Button>
    </form>)
}

export default FormularioRestaurante