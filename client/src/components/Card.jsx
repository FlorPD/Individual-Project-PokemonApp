import React from "react";
import styles from './styles/card.module.css'

export default function Card({name, sprite, types, createdInDB }){ 
    return (
        
        <span className={styles.card}>
            <div className={styles.description}>
                <h2 className={styles.title}>{name}</h2>
                <h4 className={styles.types}>TYPE: {createdInDB ? types.map((el) => el.name.toUpperCase() + (" ")) : types } </h4> 
            </div>
            <img src={sprite} alt = "img not found" width = "240px" height= "240px"/>
        </span>
        
    )
}

 