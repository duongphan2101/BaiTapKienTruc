# Sử dụng Node.js 18 làm base image
FROM node:18

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép file package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Expose cổng 3000 để có thể truy cập từ bên ngoài
EXPOSE 3000

# Lệnh chạy ứng dụng
CMD ["node", "server.js"]
