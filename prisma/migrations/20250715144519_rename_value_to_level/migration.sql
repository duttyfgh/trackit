/*
  Warnings:

  - You are about to drop the column `anxietyValue` on the `days` table. All the data in the column will be lost.
  - You are about to drop the column `moodValue` on the `days` table. All the data in the column will be lost.
  - You are about to drop the column `overallValue` on the `days` table. All the data in the column will be lost.
  - Added the required column `anxietyLevel` to the `days` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moodLevel` to the `days` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overallLevel` to the `days` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "days" DROP COLUMN "anxietyValue",
DROP COLUMN "moodValue",
DROP COLUMN "overallValue",
ADD COLUMN     "anxietyLevel" INTEGER NOT NULL,
ADD COLUMN     "moodLevel" INTEGER NOT NULL,
ADD COLUMN     "overallLevel" INTEGER NOT NULL;
