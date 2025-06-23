#!/bin/sh

# Exit on error
set -e

# Set database connection string
export DATABASE_CONNECTION_STRING="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_DB_HOST}:${POSTGRES_DB_PORT}/${POSTGRES_DB_NAME}"

if [ "$NODE_ENV" = "development" ]; then
    # persist DATABASE_CONNECTION_STRING by appending to .env file
    echo "" >> .env
    echo "DATABASE_CONNECTION_STRING=${DATABASE_CONNECTION_STRING}" >> .env
    # Run database migrations
    npx prisma migrate deploy
fi

# Execute the command passed to this script
exec "$@"
