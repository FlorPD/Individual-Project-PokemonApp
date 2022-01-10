import React from 'react'
import styles from './styles/loader.module.css'

export const Loader = () => {
    return (
      <div className= {styles.wrapper}>
        <div className={styles.pokeball}></div>
        <h3 className={styles.loading}>Loading...</h3>
      </div>
    );
}
