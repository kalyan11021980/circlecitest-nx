# Replace the base image with the appropriate Node.js version
FROM node:14-buster

WORKDIR /app

COPY package.json ./
RUN npm install

COPY dist/apps/nesttest/ ./dist/apps/nesttest/

EXPOSE 3000

CMD ["node", "dist/apps/app-name/main.js"]