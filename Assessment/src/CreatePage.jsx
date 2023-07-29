import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './CreatePage.css'; 

const proxyUrl = 'http://localhost:8080';
const apiUrl = 'https://mtp-assessment-apis.onrender.com/file';

const CreatePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    occupation: '',
    city: '',
  });
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${proxyUrl}/${apiUrl}`, formData);
      console.log(response.data);
      setFormData({
        name: '',
        age: '',
        occupation: '',
        city: '',
      });
      toast.success('Record submitted successfully', {
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
    <div className="create-page-container">
      <h1>Create New Record</h1>
      <form onSubmit={handleSubmit}>
        <div className="label-input-container">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
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
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreatePage;
