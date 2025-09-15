# ./Dockerfile
FROM node:20-alpine

# Install tools used by healthcheck (wget is in busybox)
WORKDIR /usr/src/app

# Install deps first (better caching)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY src ./src

# Expose the app port
EXPOSE 5000

# Default env (can be overridden in compose)
ENV NODE_ENV=production

# Start the server
CMD ["node", "src/server.js"]
