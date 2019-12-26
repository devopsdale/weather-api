FROM node
ADD . /weather-api 
WORKDIR /weather-api
RUN npm install 
EXPOSE 3000:3000
CMD ["npm", "start"]
