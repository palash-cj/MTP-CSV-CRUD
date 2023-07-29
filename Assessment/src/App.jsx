import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListPage from './ListPage';
import ViewPage from './ViewPage';
import UpdatePage from './UpdatePage';
import DeletePage from './DeletePage';
import CreatePage from './CreatePage';
import Sidebar from './Sidebar';

const App = () => {
  return (
    <Router>
      <div style={styles.container}>
        <Sidebar />
        <div style={styles.content}>
          {/* Use <Routes> to wrap your route configurations */}
          <Routes>
            <Route path="/list" element={<ListPage />} />
            <Route path="/view/:id" element={<ViewPage />} />
            <Route path="/update/:id" element={<UpdatePage />} />
            <Route path="/delete/:id" element={<DeletePage />} />
            <Route path="/create" element={<CreatePage />} />
            {/* Add other routes here if needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const styles = {
  container: {
    display: 'flex',
  },
  content: {
    flex: '1',
    padding: '20px',
  },
};

export default App;
