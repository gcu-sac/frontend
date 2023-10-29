FROM node:21-alpine
WORKDIR /app
EXPOSE 3000
COPY package.json ./
RUN yarn
COPY . .
RUN yarn build
CMD [ "yarn", "start" ]