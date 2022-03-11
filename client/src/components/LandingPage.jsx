import React from "react";
import {NavLink} from 'react-router-dom'
import styles from './styles/landingpage.module.css'

export default function LandingPage(){
  
    return (
      <div className={styles.background}>
        <div className={styles.box}>
          <NavLink to="/home">
            <button className={styles.button}>Enter</button>
          </NavLink>
        </div>
      </div>
    );
}
