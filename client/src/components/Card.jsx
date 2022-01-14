import React from "react";
import styles from './styles/card.module.css'

export default function Card({name, sprite, types, createdInDB }){  // props hago destructuring
    return (
        
        <span className={styles.card}>
            <div className={styles.description}>
                <h2 className={styles.title}>{name}</h2>
                <h4 className={styles.types}>TYPE: {createdInDB ? types.map((el) => el.name.toUpperCase() + (" ")) : types } </h4> 
            </div>
            <img src={sprite} alt = "img not found" width = "220px" height= "220px"/>
        </span>
        
    )
}
// Los pokemones creados tienen types en formato de arreglo de objetos con propiedad name
// ternario: si llega types --> hace algo , sino devolve Not avaliable
    //       si llega types y el pokemon tiene createdInDb, tengo que mapear el types y devolver cada elemento. Sino devolver types
 