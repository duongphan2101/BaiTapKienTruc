const axios = require('axios');

// Hàm gọi customer-service có timeout
const getCustomerWithTimeout = async (customerId) => {
  const response = await axios.get(`http://localhost:4000/api/customers/getCustomer/${customerId}`, {
    timeout: 3000, // ⏱️ timeout 3 giây
  });
  return response.data;
};

module.exports = getCustomerWithTimeout;
