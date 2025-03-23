// apiUtils.ts

import axios from 'axios';

// Get the environment-specific base URL from process.env
const getApiUrl = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'https://api.production.com';
    case 'development':
      return 'https://api.development.com';
    case 'test':
      return 'https://api.test.com';
    default:
      return 'http://localhost:5000'; 
  }
};

const apiInstance = axios.create({
  baseURL: getApiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});


export const postWithNoAuth = async<T,U> (url: string, data:T) => {
  try {
    const response = await apiInstance.post(url, data);
    return response.data as U;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Something went wrong.');
  }
};

export const postData = async (url: string, data: any,token:string) => {
    try {
      const response = await apiInstance.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Something went wrong.');
    }
  };



export const getDataNoAuth = async (url: string, ) => {
    try {
      const response = await apiInstance.get(url);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Something went wrong.');
    }
  };
export const getData = async (url: string, token: string) => {
  try {
    const response = await apiInstance.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Something went wrong.');
  }
};


export const putData = async (url: string, data: any, token: string) => {
  try {
    const response = await apiInstance.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Something went wrong.');
  }
};


export const deleteData = async (url: string, token: string) => {
  try {
    const response = await apiInstance.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Something went wrong.');
  }
};
