import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you use React Router for navigation

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
        {/* Add links to other pages here */}
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