# Event Booking Platform

## Getting Started

To get started with this project, you will need to have Docker and Node.js installed on your machine.

### Backend Setup

Install docker and docker compose.

### Frontend Setup

Run `npm install` in the `frontend` directory.

## Running the Application

From the root directory, start the services using Docker Compose:

```sh
docker-compose up -d --build
```

For live backend reloading development:

```sh
docker-compose up --build --watch
```

For frontend:

```sh
npm run dev
```

**Reminder**: We need to have the backend running for the frontend to work.

## Database Seeding

To populate the database with 10 fake events, run the following command from the **root directory** of the project inside the `backend` container.

```sh
docker-compose exec backend npm run db:seed-events
```

## Prisma

**Reminder**: If you want to use Prisma for tasks like migrations locally, you may need to set the `DATABASE_QUERY_STRING` environment variable. It should be the same as `DATABASE_CONNECTION_STRING` but might need `localhost` instead of `db` if you are connecting to the database from your host machine.
