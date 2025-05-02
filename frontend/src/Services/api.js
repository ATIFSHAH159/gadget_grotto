import axios from 'axios';

const url = "http://localhost:5000";

// Authentication functions
export const register = async (userData) => {
  try {
    const response = await axios.post(`${url}/Pages/Signup`, userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${url}/Pages/Login`, userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProfile = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${url}/api/users/profile`, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};

// Product CRUD operations
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

// Payment functions
export const createCheckoutSession = async (items) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      withCredentials: true
    };
    
    const response = await axios.post(
      `${url}/api/payment/create-checkout-session`,
      { items },
      config
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error creating checkout session' };
  }
};
  
