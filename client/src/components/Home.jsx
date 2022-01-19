import React from "react";
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllPokemons, orderByAttack, filterByType, filterCreated, orderByName, getPokemonType} from "../actions/index";
import Card from "./Card";
import Paginado from "./Paginado"
import SearchBar from "./SearchBar";
import { Loader } from "./Loader";
import styles from './styles/home.module.css'
import pokemon from '../images/title.png'

export default function Home(){
    const dispatch = useDispatch()
    
    const allPokemons = useSelector((state) => state.pokemons)
    const types = useSelector((state) => state.types)


    let [currentPage, setCurrentPage ] = useState(1) 
    let pokemonPerPage = 12                            

    const lastPokemon= currentPage * pokemonPerPage

    const firstPokemon = lastPokemon - pokemonPerPage

    const currentPokemon = allPokemons.slice(firstPokemon, lastPokemon)

    const page = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
   
    const [loading,setLoading] = useState(true)
    
    // componentDidMount
    useEffect(() => {
        dispatch(getAllPokemons())
        dispatch(getPokemonType())
    }, [dispatch])

    
    function handleClick(e){
        e.preventDefault()
        dispatch(getAllPokemons())
    }

    function sortByAttack(e) {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value));
        setCurrentPage(1);
    }
    
    function handleFilterPokemonTypes(e) {
        dispatch(filterByType(e.target.value))
        setLoading(false)
        setCurrentPage(1)
    }
    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
        setLoading(false)
    }
    function sortByAlpha(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
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
                    <option value='' hidden >ORDER BY STRENGTH</option>
                    <option value='strongest'>STRONGEST</option>
                    <option value='weakest'>WEAKEST</option>
                </select>

                <select className={styles.select} onChange={e => sortByAlpha(e)}>
                    <option value='' hidden>ORDER BY NAME</option>
                    <option value='A-Z'>A to Z</option>
                    <option value='Z-A'>Z to A</option>
                </select>

                <select className={styles.select} onChange={e => handleFilterPokemonTypes(e)}>
                    <option value = "" hidden>FILTER BY TYPE</option>
                    <option value= 'All'>ALL</option>
                    {
                        types && types.map(type => {
                            return(
                            <option key = {type.id} value = {type.name}>{type.name.toUpperCase()}</option>
                            )
                        })
                    }
             </select>

                 <select className={styles.select} onChange={e => handleFilterCreated(e)}>
                    <option value = "" hidden>FILTER BY</option>
                    <option value='all'>ALL POKEMONS</option>
                    <option value='created'>CREATED</option>
                    <option value='api'>FROM API </option>
                </select>

                <SearchBar
                setLoading={setLoading}
                />

                <Paginado
                 pokemonPerPage={pokemonPerPage}
                 allPokemons={allPokemons.length}
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

