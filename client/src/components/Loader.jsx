import React from 'react'
import styles from "./styles/loader.module.css"

export const Loader = () => {

    return (
      <div>
        <div className={styles.lds_ring}><div></div><div></div><div></div><div></div>
      </div>
        {/* <div className ={styles.loading}><p>Loading...</p></div> */}
      </div>
      
    
    );
}
