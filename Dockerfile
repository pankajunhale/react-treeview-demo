FROM node:18
RUN npm install
COPY . .
EXPOSE 8081
CMD ["npm","start"]
