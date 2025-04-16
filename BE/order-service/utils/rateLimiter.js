const axios = require('axios');
const rateLimit = require('axios-rate-limit');

// Tạo axios instance có giới hạn tốc độ
const http = rateLimit(axios.create(), {
  maxRequests: 5,       // Tối đa 5 request
  perMilliseconds: 1000, // Trong mỗi 1000ms (1 giây)
  maxRPS: 5             // Hoặc dùng cái này để set theo RPS
});

// Hàm gọi customer-service với rate limit
const getCustomerWithRateLimit = async (customerId) => {
  const response = await http.get(`http://localhost:4000/api/customers/getCustomer/${customerId}`);
  return response.data;
};

module.exports = getCustomerWithRateLimit;
