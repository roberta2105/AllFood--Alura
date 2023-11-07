import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IPrato from '../../interfaces/IPrato';
import Prato from './Prato';


const ListaRestaurantes = () => {

  //O "restaurantes" é o estado que armazenará um array de objetos do tipo IRestaurante, inicialmente vazio
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')
  const [pratos, setPratos] = useState<IPrato[]>([])


  useEffect(() => {
    //O axios acessa a URL de consulta dos restaurantes cadastrados
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
      //O then pega o resultado da requisição e adiciona o valor dela em setRestaurantes
      .then(resposta => {
        setRestaurantes(resposta.data.results) //Pega o retorno da requisição e adiciona o valor dela em restaurantes e converte para results. 
        setProximaPagina(resposta.data.next) //Pega o retorno da requisição e adiciona o valor dela em proximaPagina e converte para next. 
      })
      .catch(erro => {
        console.log(erro)
      })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/pratos/')
      .then(resposta => {
        setPratos(resposta.data.results)
      })
      .catch(erro => {
        console.log(erro)
      })
  }, [])

  const verMais = () => {
    axios.get<IPaginacao<IRestaurante>>(proximaPagina)
      .then(resposta => {
        setRestaurantes([...restaurantes, ...resposta.data.results]) //Concatena os resultados anteriores com os novos resultados
        setProximaPagina(resposta.data.next)
      })
      .catch(erro => {
        console.log(erro)
      })
  }

  return (
<section className={style.ListaRestaurantes}>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
      
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