import React, { Component } from 'react';
import UploadImageForm from '../../components/uploadImageForm/UploadImageForm';
import styles from './CarouselUploadImagePage.module.css';

class CarouselUploadImagePage extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className={styles.holder}>
        <h2> Carousel Upload Image Page</h2>

        <UploadImageForm {...this.props} />
      </div>
    );
  }
}

export default CarouselUploadImagePage;
