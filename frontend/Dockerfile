# Use Node.js LTS as the base image
FROM node:23-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose the port
EXPOSE 3000

# Install OpenSSL
RUN apk add --no-cache openssl

# Default command to start the app
CMD ["npm", "run", "dev"]