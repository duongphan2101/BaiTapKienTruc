# Base image Node.js 23.9.0
FROM node:23.9.0

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the service
CMD ["npm", "start"]
