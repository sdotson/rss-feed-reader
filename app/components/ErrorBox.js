import React from 'react';

const ErrorBox = ({ message }) => {
  return (
    <div style={styles.error}>
      <h3>Error</h3>
      <p>{message}</p>
    </div>
  );
}

export default ErrorBox;

const styles = {
  error: {
    color: 'red'
  }
}
