# Bun Backend
FROM oven/bun:1-alpine
# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++ postgresql-client curl
# Set working directory
WORKDIR /app
# Copy package files
COPY package*.json ./
RUN touch .env
# Install dependencies
RUN bun install
# Copy source code
COPY . .
# Build the application
RUN bun run build
# Create necessary directories
RUN mkdir -p logs uploads
# Expose port
EXPOSE 9000 9001
# Start the application
CMD ["bun", "run", "start"]
