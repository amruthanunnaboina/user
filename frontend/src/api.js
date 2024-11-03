import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerUser = (userData) => axios.post(`${API_URL}/register`, userData);
export const loginUser = (userData) => {
    return axios.post(`${API_URL}/login`, userData)}
export const uploadPhoto = (photo, token) => {
    console.log("here at uploading");
    const formData = new FormData();
    formData.append('photo', photo); 
  
    return axios.post(`${API_URL}/upload-photo`, formData, {
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'multipart/form-data', 
      },
    });
  };


export const getUserProfile = async (userId) => {

  try {
    const response = await axios.get(`http://localhost:5000/api/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    console.log(response.data)
    return response.data; 
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error; 
  }
};

  
  export const updateUserProfile = async (data) => {
    const response = await fetch(`/api/users/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  };
  