import axios from "axios";
import { useEffect, useState } from "react";

const Home=()=>{
    const [profileData,setProfileData] = useState({})

    // const render=async()=>{
    //     try {
    //         const data=await axios.get(`http://localhost:8000/user/getProfile?userId=1`);
    //         console.log(data);
    //         setProfileData(data.data.data);
    //     } catch (error) {
    //         console.log(error.message);
    //     }      
    // }
    // useEffect(()=>{
    //     render();
    // },[]);
    return (
        <div style={styles.container}>
          <div>Registration ID: {}</div>
          <div>Name: {}</div>
          <div>Age: {}</div>
          <div>Occupation: {}</div>
          <div>City: {}</div>
        </div>
      );
}

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
export default Home