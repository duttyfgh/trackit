/*
  Warnings:

  - You are about to drop the `days` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trackers` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "WeatherType" AS ENUM ('sunny', 'partly_cloudy', 'cloudy', 'lightning', 'rain', 'thunderstorm', 'rain_and_sun', 'snowy', 'windy', 'foggy', 'tornado', 'frosty', 'unknown');

-- DropForeignKey
ALTER TABLE "days" DROP CONSTRAINT "days_trackerId_fkey";

-- DropForeignKey
ALTER TABLE "trackers" DROP CONSTRAINT "trackers_userId_fkey";

-- DropTable
DROP TABLE "days";

-- DropTable
DROP TABLE "trackers";

-- CreateTable
CREATE TABLE "day_trackers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "day_trackers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayEntry" (
    "id" TEXT NOT NULL,
    "dayTrackerId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "moodLevel" INTEGER NOT NULL,
    "anxietyLevel" INTEGER NOT NULL,
    "weather" "WeatherType" NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "overallLevel" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DayEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "day_trackers_userId_key" ON "day_trackers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DayEntry_date_key" ON "DayEntry"("date");

-- AddForeignKey
ALTER TABLE "day_trackers" ADD CONSTRAINT "day_trackers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DayEntry" ADD CONSTRAINT "DayEntry_dayTrackerId_fkey" FOREIGN KEY ("dayTrackerId") REFERENCES "day_trackers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
