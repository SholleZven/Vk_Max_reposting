FROM node:20-alpine AS backend
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx tsc
ENV NODE_ENV=production
CMD ["node", "dist/main.js"]
