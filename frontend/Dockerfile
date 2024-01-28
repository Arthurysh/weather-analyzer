# Use an official Node runtime as precipitation parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install dependencies
RUN npm install

# Expose port 3000
EXPOSE 3000

# Run the React application
CMD ["npm", "run", "dev"]
