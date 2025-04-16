# Bảo vệ order-service khi gọi đến customer-service

---


### 1. Circuit Breaker

- Dùng thư viện `opossum`
- Nếu `customer-service` lỗi nhiều lần, hệ thống sẽ **tạm dừng gọi đến** trong một thời gian.
- Tránh làm hệ thống quá tải khi service bị lỗi.

📁 File: `utils/circuit_breaker.js`  
🧪 API test:  
```
GET /api/orders/circuit-breaker/:orderId
```

---

### 2. Retry

- Dùng thư viện `axios-retry`
- Tự động gọi lại nếu request bị lỗi mạng hoặc server trả lỗi (5xx)
- Có thể cấu hình số lần thử và thời gian chờ giữa các lần thử.

📁 File: `utils/retry.js`  
🧪 API test:  
```
GET /api/orders/retry/:orderId
```

---

### 3. Rate Limiter

- Dùng thư viện `axios-rate-limit`
- Giới hạn số lượng request đến `customer-service` (ví dụ: 5 request mỗi giây)
- Giúp tránh gửi quá nhiều request trong thời gian ngắn.

📁 File: `utils/rateLimiter.js`  
🧪 API test:  
```
GET /api/orders/rate-limit/:orderId
```

---

### 4. Time Limiter

- Dùng `timeout` của `axios`
- Nếu gọi quá lâu (ví dụ hơn 3 giây), request sẽ bị huỷ.
- Tránh trường hợp chờ response mãi không có.

📁 File: `utils/timeLimiter.js`  
🧪 API test:  
```
GET /api/orders/time-limit/:orderId'
```

---

## Cách hoạt động

1. Gọi API từ `order-service` với `orderId`
2. Tìm đơn hàng trong MongoDB
3. Lấy `customerId` từ đơn hàng
4. Gọi đến `customer-service` theo các cơ chế trên
5. Trả về thông tin đơn hàng + khách hàng

---
