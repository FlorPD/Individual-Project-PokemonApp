import React from "react";
import {NavLink} from 'react-router-dom'
import { getAllPokemons } from "../actions/index.js";
import { useDispatch } from "react-redux";
import styles from './styles/landingpage.module.css'

export default function LandingPage(){
    
    const dispatch = useDispatch()       // para que apenas entro ya se carguen los pokemones
    React.useEffect(() => {dispatch(getAllPokemons())}, [dispatch])
    
    return (
        <div className = {styles.background}>
            <h1>Welcome to My Pokemon App!</h1>
            <NavLink to= "/home">
                <button className={styles.button}>Enter</button>
            </NavLink>
        </div>
    )
}
