# Step 1: Use a Node.js image to build the application
FROM node:18 AS build
# Set the working directory inside the container
WORKDIR /app
# Copy the package.json and package-lock.json files to the container
COPY package*.json ./
# Install the project dependencies
RUN npm install --legacy-peer-deps
# Install Angular CLI globally
RUN npm install -g @angular/cli
# Copy the entire Angular project into the container
COPY . .
# Build the Angular app in production mode
RUN ng build --configuration production

# Install express
RUN npm install express
# Install morgan
RUN npm install morgan --save
# Install cors
RUN npm install cors --save

# Create a directory to hold the static files outside /app
RUN mkdir -p /app/static

# Copy the built Angular app to /app/static (not within /app/dist to avoid conflict)
RUN cp -r ./dist/* /app/static/

# Expose the port
EXPOSE 8080

# Copy server.js to the container
COPY server.js /app/server.js

# Start the server
CMD ["node", "server.js"]
