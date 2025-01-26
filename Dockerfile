# Stage 1: Build the application
FROM node:20-alpine AS builder

# Install necessary tools
RUN apk add --no-cache openssl

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the application code
COPY . .
RUN npm run fmt
# Generate Prisma client and build the application
RUN npx prisma generate && npm run build

# Remove development dependencies
RUN npm prune --production

# Stage 2: Production image
FROM node:20-alpine

# Install necessary tools
RUN apk add --no-cache openssl

# Set the working directory
WORKDIR /app

# Copy production dependencies and built files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./

# Expose the application port
EXPOSE 3000

# Set the command to run the application
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]
