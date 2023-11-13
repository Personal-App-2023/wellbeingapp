#FROM node:16
FROM node:18.18.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
#RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]