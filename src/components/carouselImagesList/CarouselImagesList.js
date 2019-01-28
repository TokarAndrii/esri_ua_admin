import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import carouselOperations from '../../redux/carouselImagesOperations';

import styles from './CarouselImageslist.module.css';

class CarouselImageslist extends Component {
  componentDidMount() {
    const { fetchAllCarouselImages } = this.props;
    fetchAllCarouselImages();
  }

  componentDidUpdate(prevProps) {
    const { carouselImages } = this.props;

    if (prevProps.carouselImages.length !== carouselImages.length) {
      const { fetchAllCarouselImages } = this.props;
      fetchAllCarouselImages();
    }
  }

  render() {
    const { carouselImages, deleteOneItemImage, isLoading } = this.props;
    return (
      <>
        {isLoading && (
          <Loader type="Watch" color="#00BFFF" height="40" width="40" />
        )}
        <table className={styles.tableClassName}>
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Legend</th>
              <th style={{ width: '400px' }}>Redirect</th>
              <th style={{ width: '800px' }}>News Images</th>
              <th style={{ width: '300px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {carouselImages.map((currentImage, index) => {
              const currNumber = index + 1;
              return (
                <tr key={currentImage.id}>
                  <td>{currNumber}</td>
                  <td>{currentImage.legend}</td>
                  <td>{currentImage.redirect}</td>
                  <td>
                    <img
                      key={currentImage.id}
                      className={styles.image}
                      src={currentImage.imageUrl}
                      alt={`image_news_${currentImage.id}`}
                    />
                  </td>

                  <td>
                    <button
                      className={styles.button}
                      type="button"
                      onClick={() => deleteOneItemImage(currentImage.id)}
                    >
                      <img
                        className={styles.buttonIcon}
                        src="./delete.png"
                        alt="delete_icon"
                      />
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}
const mstp = state => ({
  isLoading: state.isLoading,
  carouselImages: state.carouselImages,
});

const mdtp = {
  fetchAllCarouselImages: carouselOperations.fetchCarouselImagesList,
  deleteOneItemImage: carouselOperations.deleteImage,
};

export default connect(
  mstp,
  mdtp,
)(CarouselImageslist);
