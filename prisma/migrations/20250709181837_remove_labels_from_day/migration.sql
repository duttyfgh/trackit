/*
  Warnings:

  - You are about to drop the column `anxietyLabel` on the `days` table. All the data in the column will be lost.
  - You are about to drop the column `moodLabel` on the `days` table. All the data in the column will be lost.
  - You are about to drop the column `overallLabel` on the `days` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "days" DROP COLUMN "anxietyLabel",
DROP COLUMN "moodLabel",
DROP COLUMN "overallLabel";
