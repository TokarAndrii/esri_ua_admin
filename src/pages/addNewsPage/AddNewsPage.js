import React, { Component } from 'react';
import NewsForm from '../../components/newsForm/NewsForm';

class AddNewsPage extends Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <h2>Add news page</h2>
        <NewsForm {...this.props} />
      </>
    );
  }
}

export default AddNewsPage;
