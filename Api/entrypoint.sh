#!/bin/bash

cd Api
sleep 10

# add error validation
# Apply database migrations
echo "Apply database migrations"
./node_modules/.bin/sequelize-cli db:migrate

# Get migrtion status
echo "Apply database migrations"
./node_modules/.bin/sequelize-cli db:migrate:status

# Removing modules
# echo "Removing modules"
# rm -rf ./Api

# Start server
echo "Starting server"
node ./build/main.js
