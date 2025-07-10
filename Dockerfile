# Gunakan image Node.js ringan
FROM node:18-alpine

# Direktori kerja di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json untuk install dependensi
COPY package*.json ./

# Install dependency
RUN npm install

# Salin semua source code ke dalam container
COPY . .

# Jalankan build Next.js
RUN npm run build

# Atur environment production dan port
ENV NODE_ENV=production
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]