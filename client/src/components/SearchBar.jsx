import React from "react"
import {useState} from "react";
import {useDispatch } from "react-redux";
import { getPokemonName } from "../actions/index";
import styles from "./styles/searchBar.module.css"

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState('') // estado local
    
    
    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)  // e.target.value --> Lo que el usuario esta escribiendo. Seteo el estado con ese valor
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getPokemonName(name)) // name es el estado local, lo que esta escribiendo el usuario
        setName('')
    }
    
    return(
        <div className={styles.search}>
            <input className={styles.search_input}
            type = "text"
            placeholder = "Search by name.."
            onChange = {(e) => handleInputChange(e)}
            />
            <button className={styles.button} type = "submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
    }
