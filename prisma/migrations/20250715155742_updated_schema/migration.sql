/*
  Warnings:

  - A unique constraint covering the columns `[dayTrackerId,date]` on the table `DayEntry` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "DayEntry_date_key";

-- CreateIndex
CREATE UNIQUE INDEX "DayEntry_dayTrackerId_date_key" ON "DayEntry"("dayTrackerId", "date");
