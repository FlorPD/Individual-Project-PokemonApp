import React from "react"
import {useState} from "react";
import {useDispatch } from "react-redux";
import { getPokemonName } from "../actions/index";
import styles from "./styles/searchBar.module.css"

export default function SearchBar({setLoading}){
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    
    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getPokemonName(name))
        setLoading(true)
        setName("")
    }
    
    return(
        <div className={styles.search}>
            <input className={styles.search_input}
            type = "text"
            value={name}
            placeholder = "Search by name.."
            onChange = {(e) => handleInputChange(e)}
            />
            <button className={styles.button} type = "submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
    }
