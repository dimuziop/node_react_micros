FROM node:alpine

ENV CI=true

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

EXPOSE ${PORT}

CMD ["npm", "start"]
