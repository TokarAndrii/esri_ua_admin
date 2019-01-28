import React from 'react';
import { Link } from 'react-router-dom';
import CarouselImagesList from '../../components/carouselImagesList/CarouselImagesList';
import styles from './CarouselMenuPage.module.css';
import upload from './upload.png';

const CarouselMenuPage = () => (
  <div className={styles.holder}>
    <h2 className={styles.title}>CarouselMenuPage</h2>
    <div className={styles.menuPage}>
      <Link to="/carousel-images/upload" className={styles.uploadButton}>
        <img src={upload} alt="upload_icon" className={styles.buttonIcon} />
        Upload Image
      </Link>
    </div>

    <CarouselImagesList />
  </div>
);

export default CarouselMenuPage;
