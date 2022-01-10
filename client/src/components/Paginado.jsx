import React from "react";
import styles from './styles/paginado.module.css'

export default function Paginado({pokemonPerPage, allPokemons, page}){  // pokemonPerPage = cuantos pokemones quiero por pagina
    const pageNumbers = []
    for (let i=1 ; i<= Math.ceil(allPokemons/pokemonPerPage); i++){   
        pageNumbers.push(i)    // para que los numeritos arranquen en 1
    }
    return (
        <nav>
            <div className={styles.pagination}>
                {pageNumbers && pageNumbers.map(number => (
                     <p key ={number}> 
                         <button className={styles.numbers} onClick={()=> page(number)}>{number}</button>
                    </p>
    ))}
            </div>
        </nav>
    )
}
