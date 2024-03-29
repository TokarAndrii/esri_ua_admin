import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NewsTable.module.css';

const NewsTable = ({ tableClassName, newsList, onDelete }) => (
  <table className={tableClassName}>
    <thead>
      <tr>
        <th style={{ width: '50px' }}>#</th>
        <th style={{ width: '50px' }}>ID</th>
        <th>Title</th>
        <th style={{ width: '400px' }}>Preview Content</th>
        <th style={{ width: '600px' }}>Content</th>
        <th>Created Date</th>
        <th>Update Date</th>
        <th style={{ width: '300px' }}>News Images</th>
        <th style={{ width: '300px' }}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {newsList.map((newsItem, index) => {
        const currNumber = index + 1;
        return (
          <tr key={newsItem.id}>
            <td>{currNumber}</td>
            <td>{newsItem.id}</td>
            <td>{newsItem.title}</td>
            <td>{newsItem.preview}</td>
            <td>{newsItem.content}</td>
            <td>{newsItem.createdDate}</td>
            <td>{newsItem.updateDate}</td>
            <td>
              {newsItem.newsImages &&
                newsItem.newsImages.map(curr => (
                  <img
                    key={curr.id}
                    className={styles.image}
                    src={curr.imageUrl}
                    alt={`image_news_${curr.id}`}
                  />
                ))}
            </td>
            <td>
              <Link
                to={`/edit-news/${newsItem.id}`}
                className={styles.editButton}
              >
                <img
                  src="./edit.png"
                  alt="edit_icon"
                  className={styles.buttonIcon}
                />
                Edit
              </Link>
              {/* <button
                className={styles.button}
                type="button"
                onClick={() => onEdit(newsItem.id)}
              /> */}
              <button
                className={styles.button}
                type="button"
                onClick={() => onDelete(newsItem.id)}
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
);

export default NewsTable;
