import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import './ListPage.css'; 

const proxyUrl = 'http://localhost:8080';
const apiUrl = 'https://mtp-assessment-apis.onrender.com/file';

const ListPage = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`${apiUrl}`);
        setRecords(response.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchRecords();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      toast.success('Record deleted successfully');
      setRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="list-page-container">
      <h1>List of Records</h1>
      <table className="records-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.name}</td>
              <td>
                <Link className="action-link" to={`/view/${record.id}`}>
                  View
                </Link>
                <Link className="action-link" to={`/update/${record.id}`}>
                  Edit
                </Link>
                <button className="delete-button" onClick={() => handleDelete(record.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListPage;
