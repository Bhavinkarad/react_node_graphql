#!/bin/sh -e

psql --variable=ON_ERROR_STOP=1 --username "postgres" <<-EOSQL
  CREATE DATABASE "database";
EOSQL

psql --variable=ON_ERROR_STOP=1 --username "postgres" --dbname=database <<-EOSQL
  CREATE EXTENSION "uuid-ossp";
EOSQL

