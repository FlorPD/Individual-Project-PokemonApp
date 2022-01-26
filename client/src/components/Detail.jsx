import React, {useEffect} from "react"
import { NavLink, useParams } from "react-router-dom";
import { getPokemonDetail, clearDetailsState } from "../actions/index";
import {useDispatch, useSelector } from "react-redux";
import { Loader } from "./Loader";
import styles from './styles/detail.module.css'


export default function Detail() {
    const dispatch = useDispatch()
    const params = useParams() // v6 de react router dom 
    // console.log(params)

    const loading = true
    const myPokemon = useSelector((state) => state.detail)

    useEffect(() => {
        dispatch(getPokemonDetail(params.id)) 
        return () => {
            dispatch(clearDetailsState()) }   //componentWilUnmount
    }, [dispatch, params.id])
                                          
    return(
        <div className={styles.page}>
            {
                myPokemon.length > 0 ?
                <div className={styles.container}>
                    <div className={styles.info}>
                         <h2 className={styles.title}>{myPokemon[0].name.toUpperCase()}</h2>
                         <img className={styles.pic} src={myPokemon[0].sprite} alt = "img not found" width = "260px" height= "260px"/>
                         </div>
                         <div className={styles.stats}>
                         <h4 className={styles.subtitle}>Stats:</h4>
                        <p>Hp: {myPokemon[0].hp} </p>
                        <p>Strength: {myPokemon[0].attack} </p>
                        <p>Defense: {myPokemon[0].defense} </p>
                        <p>Speed: {myPokemon[0].speed}</p>
                        <p>Height: {myPokemon[0].height} </p>
                        <p>Weight: {myPokemon[0].weight} </p>
                        <p className= {styles.types}>POKEMON TYPE: {
                            // en la api los types vienen en un arreglo de strings y los que vienen de la bd vienen en un arreglo de obj con prop name
                            myPokemon[0].types? !myPokemon[0].createdInDB? myPokemon[0].types + " " : myPokemon[0].types.map(el => el.name.toUpperCase() + " ") : "No type specified for this pokemon, sorry"
                            }</p>

                         </div>

                </div> 
                        : loading ?  <Loader/>
                        : <h3>Pokemon's details not avaliable</h3>
                    }
                
              <div>
                     <NavLink to = "/home">
                    <button className= {styles.button}>Back to home</button>
                     </NavLink>
             </div>
        </div>
    )
}