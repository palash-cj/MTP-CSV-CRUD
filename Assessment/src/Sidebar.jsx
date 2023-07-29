import React from 'react';
import { Link } from 'react-router-dom'; 

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <h2>Menu</h2>
      <ul>
        <li>
          <Link to="/list">List Records</Link>
        </li>
        <li>
          <Link to="/create">Create Record</Link>
        </li>
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '200px',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    height: '100vh',
  },
};

export default Sidebar;
