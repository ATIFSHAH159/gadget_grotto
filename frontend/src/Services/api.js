import axios from 'axios';

const url = "http://localhost:5000";

export const AddProd = async (formdata) => {
  try {
    const response = await axios.post(`${url}/Admin/AddProducts`, formdata);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getprod = async () => {
  try {
    const response = await axios.get(`${url}/Admin/ViewProducts`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getproductByCategory = async (category) => {
  try {
    const response = await axios.get(`${url}/${category}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await axios.get(`${url}/search?query=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteproductbyid = async (productid) => {
  try {
    const response = await axios.delete(`${url}/Admin/ViewProducts/${productid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProductById = async (id, updatedProduct) => {
  try {
    const response = await axios.put(`${url}/Admin/ViewProducts/${id}`, updatedProduct);
    return response.data;
  } catch (error) {
    throw error;
  }
};
  
