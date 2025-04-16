// utils/circuit_breaker.js
const axios = require('axios');
const CircuitBreaker = require('opossum');

// Hàm gọi sang customer-service
async function fetchCustomer(customerId) {
    const response = await axios.get(`http://localhost:4000/api/customers/getCustomer/${customerId}`, {
        validateStatus: status => status >= 200 && status < 300 // chỉ 2xx mới là thành công
    });
    return response.data;
}

const breakerOptions = {
    timeout: 1000,
    errorThresholdPercentage: 50,  // Nếu 50% lỗi sau đủ số request thì ngắt
    volumeThreshold: 6,            // Chỉ bắt đầu tính % lỗi sau 5 request
    resetTimeout: 10000,
    rollingCountTimeout: 10000,
    rollingCountBuckets: 10
};

// Tạo circuit breaker
const customerBreaker = new CircuitBreaker(fetchCustomer, breakerOptions);

// Fallback nếu không gọi được
customerBreaker.fallback(() => {
    return { message: 'Dịch vụ khách hàng hiện không khả dụng (fallback)' };
});

// Log trạng thái circuit breaker (tuỳ chọn)
customerBreaker.on('open', () => console.warn('Circuit breaker OPEN: Đã ngắt mạch đến customer-service'));
customerBreaker.on('halfOpen', () => console.log('Circuit breaker HALF-OPEN: Đang thử kết nối lại...'));
customerBreaker.on('close', () => console.log('Circuit breaker CLOSED: Đã kết nối lại thành công'));

module.exports = customerBreaker;

