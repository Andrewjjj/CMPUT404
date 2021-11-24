FROM mysql:5.7

WORKDIR /docker-entrypoint-initdb.d

COPY ./initialize.sql .

EXPOSE 5432