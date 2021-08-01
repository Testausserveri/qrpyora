FROM bitnami/apache:latest

COPY ./public/build/ /app/public/
COPY ./admin/build/ /app/admin/
COPY ./vhost.conf /vhosts/vhost.conf

EXPOSE 8080
