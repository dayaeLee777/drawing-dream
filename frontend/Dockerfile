from node:lts-alpine as builder

WORKDIR /app
COPY package.json .

RUN npm install --save --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html