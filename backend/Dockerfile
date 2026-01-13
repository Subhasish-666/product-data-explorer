# -----------------------------
# Base image
# -----------------------------
FROM node:20-alpine AS base

WORKDIR /app

# -----------------------------
# Dependencies
# -----------------------------
FROM base AS deps

COPY package*.json ./
RUN npm install

# -----------------------------
# Build
# -----------------------------
FROM deps AS build

COPY . .
RUN npm run build

# -----------------------------
# Production
# -----------------------------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only what is needed
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 3001

# Default: API server
CMD ["node", "dist/main.js"]