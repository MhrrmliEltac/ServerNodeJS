# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker caching for dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Expose the application port
EXPOSE 5000

# Set the environment variables to ensure MongoDB connects correctly
# Ensure you use the appropriate MongoDB URI in your environment (e.g., from .env file)
# Example: DB_CONNECTION_STR="mongodb://mongo:27017/yourdb"
ENV DB_CONNECTION_STR=mongodb://127.0.0.1:27017/CozaStoreUser
ENV PORT=5000

# Start the application
CMD ["node", "index.js"]

# Explanation of fixes:
# 1. Ensure DB_CONNECTION_STR points to the MongoDB hostname in Docker (e.g., "mongo" if using Docker Compose).
# 2. Copying only package files first allows Docker to cache dependencies unless they change.
# 3. Using `node index.js` for a clean, direct start command.
