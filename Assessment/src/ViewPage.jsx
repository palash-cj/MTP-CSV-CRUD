import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ViewPage.css'; 

const proxyUrl = 'http://localhost:8080'; 
const apiUrl = 'https://mtp-assessment-apis.onrender.com/file';

const ViewPage = () => {
  const [record, setRecord] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(`${proxyUrl}/${apiUrl}/${id}`);
        setRecord(response.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchRecord();
  }, [id]);

  if (!record) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>View Record</h1>
      <div className="view-page-container">
        <div className="info-item">
          <span className="label">ID:</span>
          <span className="value">{record.id}</span>
        </div>
        <div className="info-item">
          <span className="label">Name:</span>
          <span className="value">{record.name}</span>
        </div>
        <div className="info-item">
          <span className="label">Age:</span>
          <span className="value">{record.age}</span>
        </div>
        <div className="info-item">
          <span className="label">Occupation:</span>
          <span className="value">{record.occupation}</span>
        </div>
        <div className="info-item">
          <span className="label">City:</span>
          <span className="value">{record.city}</span>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
