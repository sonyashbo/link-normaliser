FROM node:18
WORKDIR /app
COPY package.json .
COPY tsconfig.json .
COPY src ./src
RUN ls -a
RUN npm install
RUN npm run build

WORKDIR /app/build

CMD ["node", "index.js"]

EXPOSE 8000
