import axios from 'axios';

const ProductService = {
  getProductDetails: async (id) => {
    try {
      const response = await axios.get(`http://localhost:8082/api/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching product details: ${error.message}`);
    }
  },
};

export default ProductService;
