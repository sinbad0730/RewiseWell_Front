import axios from 'axios';
import { API_BASE_URL } from '@/utils/axios';

const getAuthToken = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  const authToken = localStorage.getItem('authtoken');
  return authToken ? JSON.parse(authToken) : null;
};

export const fetchUnits = async (subject_id: number) => {
  const authToken = getAuthToken();
  if (!authToken) {
    throw new Error('No authentication token found');
  }

  const token = authToken.access_token;
  const userData = authToken.user;

  try {
    const response = await axios.get(`${API_BASE_URL}/grade-retrieval/get_unit/${subject_id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      params: {
        user_id: userData.id,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching units:', error);
    throw error;
  }
};

export const fetchUnitsNames = async (subject_id: number) => {
  const authToken = getAuthToken();
  if (!authToken) {
    throw new Error('No authentication token found');
  }

  const token = authToken.access_token;

  try {
    const response = await axios.get(`${API_BASE_URL}/grade-retrieval/${subject_id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching units:', error);
    throw error;
  }
};