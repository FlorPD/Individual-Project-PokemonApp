import React from "react";
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllPokemons, orderByAttack, filterByType, filterCreated, orderByName} from "../actions/index";
import Card from "./Card";
import Paginado from "./Paginado"
import SearchBar from "./SearchBar";
import { Loader } from "./Loader";
import styles from './styles/home.module.css'
import pokemon from '../images/title.png'


export default function Home(){
    const dispatch = useDispatch() // despachar acciones
    
    const allPokemons = useSelector((state) => state.pokemons) // me traigo todo lo que esta en el estado de pokemons. Reemplaza al mapStateToProps
    // useState --> seteo el estado local
    const [order, setOrder] = useState("") // estado local

    let[currentPage, setCurrentPage ] = useState(1)   // siempre empieza en la primera pagina
    let [pokemonPerPage] = useState(12)                             // cuantos pokemones quiero por pagina

    const indexOfLastPokemon= currentPage * pokemonPerPage // ultimo pokemon de cada pagina

    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage // primer pokemon de cada pagina

    const currentPokemon = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon) // personajes que se van a renderizar segun la pagina

    const page = (pageNumber) => {
        
        setCurrentPage(pageNumber)
    }
   
    const [loading,setLoading] = useState(true)

    // Para traer estado los pokemones cuando el componente se monta
    useEffect(() => {
        dispatch(getAllPokemons()) // despacho la accion que me trae todos los pokemones
    }, [dispatch])  // para que no se genere un loop infinito

    
    function handleClick(e){
        e.preventDefault()
        dispatch(getAllPokemons())
    }
    function sortByAttack(e) {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value));
        setCurrentPage(1);                      // seteo la pagina en 1 y creo un estado local que empieza vacio y luego lo seteo para que
        setOrder(`Ordenado ${e.target.value}`)  // me renderize el ordenamiento
    }
    function handleFilterPokemonTypes(e) {
        dispatch(filterByType(e.target.value))
        setLoading(false)
        setCurrentPage(1)
    }
    function handleFilterCreated(e) {     //  e.target.value es el payload -> lo que el usuario selecciona
        dispatch(filterCreated(e.target.value))
        setLoading(false)
    }

    function sortByAlpha(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    }

    return(
        <div className={styles.main_container}>
            <Link to= "/pokemons" className={styles.link}><button className={styles.button}>Create your Pokemon</button></Link>

            <img className ={styles.pic} src = {pokemon} alt='img not found'/>
            <button className={styles.refresh_btn} onClick={e => {handleClick(e)}}>
                Get all Pokemons
            </button>

            <div>

                <select className={styles.select} onChange={e => sortByAttack(e)}>
                    <option value='' hidden>Order by Strength</option>
                    <option value='strongenst'>Strongest</option>
                    <option value='weakest'>Weakest</option>
                </select>

                <select className={styles.select} onChange={e => sortByAlpha(e)}>
                    <option value='' hidden>Order by name</option>
                    <option value='A-Z'>A to Z</option>
                    <option value='Z-A'>Z to A</option>
                </select>

                <select className={styles.select} onChange={e => handleFilterPokemonTypes(e)}>
                    <option value = "" hidden>Filter by type</option>
                    <option value= 'All'>All</option>
                    <option value= 'normal'>Normal</option>
                    <option value= 'fighting'>Fighting</option>
                    <option value= 'flying'>Flying</option>
                    <option value= 'poison'>Poison</option>
                    <option value= 'ground'>Ground</option>
                    <option value= 'rock'>Rock</option>
                    <option value= 'bug'>Bug</option>
                    <option value= 'ghost'>Ghost</option>
                    <option value= 'steel'>Steel</option>
                    <option value= 'fire'>Fire</option>
                    <option value= 'water'>Water</option>
                    <option value= 'grass'>Grass</option>
                    <option value= 'electric'>Electric</option>
                    <option value= 'psychic'>Psychic</option>
                    <option value= 'ice'>Ice</option>
                    <option value= 'dragon'>Dragon</option>
                    <option value= 'dark'>Dark</option>
                    <option value= 'fairy'>Fairy</option>
                    <option value= 'unknown'>Unknown</option>
                    <option value= 'shadow'>Shadow</option>
             </select>

                 <select className={styles.select} onChange={e => handleFilterCreated(e)}>
                     <option value = "" hidden>Filter by</option>
                    <option value='all'>All Pokemons</option>
                    <option value='created'>Created</option>
                    <option value='api'>From API </option>
                </select>

                <SearchBar />

                <Paginado
                 pokemonPerPage={pokemonPerPage}
                 allPokemons={allPokemons.length} // valor numerico
                 page={page}
                />

             { 
               currentPokemon.length ? currentPokemon.map( (p) =>{
                    return (
                        <div className={styles.cards} key= {p.id} >
                            <Link to ={ "/pokemons/" + p.id}>
                            <Card name= {p.name.toUpperCase()}
                                  sprite = {p.sprite}
                                  types={p.types}
                                  createdInDB={p.createdInDB}
                             />
                            </Link>
                        </div>
                    )
                }) : loading? <Loader/> :
                 <h3 className={styles.error} >No Pokemon avaliable</h3>
                 
            } 
            
            </div>
      </div>
    )
}

