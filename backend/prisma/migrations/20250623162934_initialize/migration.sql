-- CreateTable
CREATE TABLE "event_occupancy" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "original_capacity" INTEGER NOT NULL,
    "remaining_occupancy" INTEGER NOT NULL,

    CONSTRAINT "event_occupancy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_booking" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "customer_email" TEXT NOT NULL,
    "num_attendees" INTEGER NOT NULL,
    "booking_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "event_occupancy" ADD CONSTRAINT "event_occupancy_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_booking" ADD CONSTRAINT "event_booking_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
