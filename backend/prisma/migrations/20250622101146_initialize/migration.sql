-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "capacity" INTEGER DEFAULT 0,
    "price_per_person" DOUBLE PRECISION DEFAULT 0,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "events_title_active_idx" ON "events"("title", "active");

-- CreateIndex
CREATE INDEX "events_date_active_idx" ON "events"("date", "active");

-- CreateIndex
CREATE INDEX "events_price_per_person_active_idx" ON "events"("price_per_person", "active");

-- CreateIndex
CREATE INDEX "events_created_at_idx" ON "events"("created_at");
