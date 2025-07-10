# Dockerfile
FROM node:18-alpine

# Set workdir
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build Next.js app
RUN npm run build

# Set env and expose
ENV NODE_ENV=production
EXPOSE 3000

# Start the app
CMD ["npm", "start"]