import React from 'react';

const RecordItem = ({ record }) => {
  const { id, name, age, occupation, city } = record;

  return (
    <div style={styles.container}>
      <div>Registration ID: {id}</div>
      <div>Name: {name}</div>
      <div>Age: {age}</div>
      <div>Occupation: {occupation}</div>
      <div>City: {city}</div>
    </div>
  );
};

const styles = {
  container: {
    border: '1px solid #ccc',
    padding: '10px',
    margin: '10px',
    borderRadius: '4px',
    boxShadow: '2px 2px 4px #ccc',
    maxWidth: '300px',
  },
};

export default RecordItem;
