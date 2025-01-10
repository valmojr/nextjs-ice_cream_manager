# Use Node.js LTS as the base image
FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose the port
EXPOSE 3000

# Default command to start the app
CMD ["npm", "run", "dev"]