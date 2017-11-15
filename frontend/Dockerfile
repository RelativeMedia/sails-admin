FROM nginx
MAINTAINER Mike DeVita <mike@relative.media>

RUN rm /etc/nginx/conf.d/*
COPY .docker/etc/nginx/nginx.conf /etc/nginx/conf.d/

RUN mkdir /frontend
