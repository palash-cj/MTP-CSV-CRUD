import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you use React Router to handle routes

const ViewPage = () => {
  const { id } = useParams();
  const [record, setRecord] = useState(null);

  // Fetch the particular record by ID
  useEffect(() => {
    // Fetch the record using the provided ID
    // Example:
    // fetch(`your-api-endpoint/${id}`)
    //   .then((response) => response.json())
    //   .then((data) => setRecord(data))
    //   .catch((error) => console.error('Error fetching record:', error));
  }, [id]);

  if (!record) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Record Details</h1>
      <p>ID: {record.id}</p>
      <p>Name: {record.name}</p>
      <p>Age: {record.age}</p>
      <p>Occupation: {record.occupation}</p>
      <p>City: {record.city}</p>
    </div>
  );
};

export default ViewPage;
