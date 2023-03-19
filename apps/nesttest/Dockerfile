FROM node:12.16.1-alpine3.9
COPY dist/app/nesttest /app
RUN npm install --production
EXPOSE 3000
CMD ["node", "main.js"]
