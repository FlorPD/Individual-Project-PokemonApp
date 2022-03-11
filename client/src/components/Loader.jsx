import React from 'react';
import { useSelector } from 'react-redux';
import loadingImg from '../images/loader.gif';
import styles from "./styles/loader.module.css"

export default function Loader() {
  const loading = useSelector((state) => state.loading);

  return (
    <div>
      {loading && (
        <div className={styles.loadingContainer}>
          <img className={styles.loadingImage} src={loadingImg} alt='img' />
        </div>
      )}
    </div>
  )
}