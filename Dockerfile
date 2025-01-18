# Use the official Node.js image as a base image
FROM node:20-alpine


RUN apk add openssl 
# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install production dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application

RUN npx prisma generate
RUN npm run build
# Remove development dependencies
RUN npm prune --production

# Expose the application port
EXPOSE 3000

# Start the application
CMD npx prisma migrate deploy && npm run start:prod

