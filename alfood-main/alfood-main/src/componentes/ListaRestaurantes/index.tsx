import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IPrato from '../../interfaces/IPrato';
import Prato from './Prato';
import TextField from '@mui/material/TextField';


const ListaRestaurantes = () => {

  //O "restaurantes" é o estado que armazenará um array de objetos do tipo IRestaurante, inicialmente vazio
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')
  const [pratos, setPratos] = useState<IPrato[]>([])
  const [nomeRestaurante, setNomeRestaurante] = useState('')

  const [restaurantesOriginais, setRestaurantesOriginais] = useState<IRestaurante[]>([]);

  //Lista todos os restaurantes cadastrados
  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/restaurantes/')
      .then((resposta) => {
        setRestaurantes(resposta.data.results);
        setRestaurantesOriginais(resposta.data.results);
      })
      .catch((erro) => {
        console.log(erro);
      });
    
    //Lista todos os pratos cadastrados
    axios.get('http://localhost:8000/api/v1/pratos/')
      .then((resposta) => {
        setPratos(resposta.data.results);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  //Função de pesquisa onde passa o nome como parametro
  const handleSearch = (nome: string) => {
    //resultadoPesquisa recebe uma nova lista após aplicação de um filtro de busca por nome do restaurante
    const resultadoPesquisa = restaurantesOriginais.filter((restaurante) =>
      restaurante.nome.toLowerCase().includes(nome.toLowerCase())
    );
  //Verifica se a string de pesquisa (nome) está vazia. Se estiver vazia,
  //a lista de restaurantes é exibida (carregando todos os restaurantes).
  //Se o campo estiver preenchido, realiza uma busca.
    if (nome === '') {
      setRestaurantes(restaurantesOriginais);
    } else {
      setRestaurantes(resultadoPesquisa);
    }
  };

  useEffect(() => {
    handleSearch(nomeRestaurante);
  }, [nomeRestaurante, restaurantesOriginais]);


  const verMais = () => {
    axios.get<IPaginacao<IRestaurante>>(proximaPagina)
      .then((resposta) => {
        setRestaurantes([...restaurantes, ...resposta.data.results]);
        setProximaPagina(resposta.data.next);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  return (
    <section className={style.ListaRestaurantes}>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>

      <TextField
        id="outlined-helperText"
        label="Procurar restaurante"
        value={nomeRestaurante}
        onChange={evento => setNomeRestaurante(evento.target.value)}
      />

      {restaurantes?.map(restaurante => ( // Mapeia uma lista de restaurantes cadastrados, podendo retornar null.

        <div key={restaurante.id}>  {/*Para cada item retornado da lista, é vinculado a ele o id do restaurante. */}

          <Restaurante restaurante={restaurante} /> {/* Aqui será renderizado o componente Restaurante, passando as informações de restaurante. */}

          {pratos.filter(prato => prato.restaurante === restaurante.id) //Filtra apenas os pratos associados a um restaurante específico. Comparando o restaurante de cada prato com o id do restaurante atual.
            .map(prato => (
              <Prato prato={prato} key={prato.id} /> // Renderiza o componente e dá o valor de prato a ele.
            ))}
        </div>
      ))}
      {proximaPagina && (
        <button onClick={verMais}>
          ver mais
        </button>
      )}
    </section>
  );
};

export default ListaRestaurantes;