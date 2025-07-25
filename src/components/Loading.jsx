import styles from  "./Loading.module.css";
import PropTypes from 'prop-types';
import React from 'react';
 

function Loading() {
  return (
    <div className={styles.fullScreenLoader}>
      <span className={styles.gear}>⚙️</span>
      <p>Loading ...</p>
    </div>
  );
}

Loading.propTypes = {
  /** one of the predefined spinner sizes */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** optional text below the spinner */
  message: PropTypes.string,
};

Loading.defaultProps = {
  size: 'medium',
  message: '',
};

export default Loading;