# Use the official Node.js image as a build step
FROM node:18-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight web server to serve the React app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port Nginx will listen on
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
