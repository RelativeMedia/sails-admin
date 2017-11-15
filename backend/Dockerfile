FROM node:6.11.5
MAINTAINER Mike DeVita <mike@relative.media>

RUN npm cache clean -f && npm i -g nodemon

WORKDIR /backend
ADD . .
RUN touch npm-debug.log && npm install --production
EXPOSE 1337

CMD ["npm", "start"]
