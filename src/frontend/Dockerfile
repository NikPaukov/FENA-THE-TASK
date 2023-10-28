FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

ENV NODE_ENV production

EXPOSE 3001
# Start the app
CMD [ "npx", "serve", "build" ]
