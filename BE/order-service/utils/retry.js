const axios = require('axios');
const axiosRetry = require('axios-retry').default;

// Cấu hình retry cho axios
axiosRetry(axios, {
  retries: 5, // Số lần thử lại
  retryDelay: (retryCount) => {
    console.log(`Retry lần ${retryCount}`);
    return retryCount * 1000; // Delay giữa các lần thử (ms)
  },
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response.status >= 500;
  },
});

const getCustomerWithRetry = async (customerId) => {
  const response = await axios.get(`http://localhost:4000/api/customers/getCustomer/${customerId}`);
  return response.data;
};

module.exports = getCustomerWithRetry;
