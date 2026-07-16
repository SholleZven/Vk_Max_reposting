FROM node:20-alpine

RUN apk add --no-cache ca-certificates

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx tsc

ENV NODE_ENV=production

# Запускаем с обновлением сертификатов
CMD ["sh", "-c", "cp /app/certs/*.crt /usr/local/share/ca-certificates/ 2>/dev/null; update-ca-certificates; node dist/index.js"]