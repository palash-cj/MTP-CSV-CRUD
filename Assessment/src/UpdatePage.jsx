import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UpdatePage.css';

const proxyUrl = 'http://localhost:8080'; 
const apiUrl = 'https://mtp-assessment-apis.onrender.com/file';

const UpdatePage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    age: '',
    occupation: '',
    city: '',
  });

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(`${apiUrl}/${id}`);
        const recordData = response.data.data;
        setFormData({
          id: recordData.id,
          name: recordData.name,
          age: recordData.age,
          occupation: recordData.occupation,
          city: recordData.city,
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchRecord();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${apiUrl}/${id}`, formData);
      
      toast.success('Record updated successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      navigate('/list');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1 className="update-heading">Update Record</h1>
      <div className="update-page-container">
        <form onSubmit={handleSubmit}>
          <div className="label-input-container">
            <label htmlFor="id">ID:</label>
            <span>{formData.id}</span>
          </div>
          <div className="label-input-container">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="label-input-container">
            <label htmlFor="age">Age:</label>
            <input
              type="text"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="label-input-container">
            <label htmlFor="occupation">Occupation:</label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              required
            />
          </div>
          <div className="label-input-container">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdatePage;
