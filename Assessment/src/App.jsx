import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListPage from './ListPage';
import ViewPage from './ViewPage';
import UpdatePage from './UpdatePage';
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
            <Route path="/create" element={<CreatePage />} />
            {/* Add other routes here if needed */}
          </Routes>
        </div>
      </div>
      <ToastContainer />
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
