FROM node:alpine as builder
WORKDIR /app
COPY ./client/package.json .
RUN npm install
COPY ./client .
RUN npm run build

FROM node:alpine
WORKDIR /usr/app
COPY ./package.json .
RUN npm install
COPY . .
COPY --from=builder /app/dist/client /usr/app/public
CMD ["npm", "start"]