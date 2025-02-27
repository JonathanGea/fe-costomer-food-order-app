# Stage 1: Build aplikasi Angular
FROM node:20-alpine AS build
WORKDIR /app
# Salin file package.json dan package-lock.json agar caching bekerja
COPY package*.json ./
RUN npm install
# Salin seluruh source code
COPY . .
# Buat build produksi
RUN npm run build --configuration production

# Stage 2: Serve file build dengan Caddy
FROM caddy:alpine
WORKDIR /app
# Salin output build Angular ke direktori yang akan dilayani Caddy (default WORKDIR Caddy adalah /srv)
# Ganti "nama-aplikasi" sesuai nama folder output di dist
COPY --from=build /app/dist/fe-costomer-food-order-app /srv
# Salin file konfigurasi Caddyfile
COPY Caddyfile /etc/caddy/Caddyfile
# Railway akan mengeset variabel lingkungan PORT, jadi gunakan itu di Caddyfile
EXPOSE 80
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
