# server/Dockerfile

# Use Node.js LTS version
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the app
CMD ["node", "src/index.js"]