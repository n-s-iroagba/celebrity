// apiUtils.ts

import axios from 'axios';



export const postWithNoAuth = async<T,U> (url: string, data:T) => {
  try {
    const response = await axios.post(url, data);
    return response.data as U;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Something went wrong.');
  }
};

export const postData = async (url: string, data: any,token:string) => {
    try {
      const response = await axios.post(url, data, {
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
      const response = await axios.get(url);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Something went wrong.');
    }
  };
export const getData = async (url: string, token: string) => {
  try {
    const response = await axios.get(url, {
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
    const response = await axios.put(url, data, {
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
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Something went wrong.');
  }
};
