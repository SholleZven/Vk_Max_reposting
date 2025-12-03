FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx tsc
ENV NODE_ENV=production
CMD ["node", "dist/index.js"]
