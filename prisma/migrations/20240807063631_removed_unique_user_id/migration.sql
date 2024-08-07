/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `QazaPrayer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "QazaPrayer_userId_date_key";

-- CreateIndex
CREATE UNIQUE INDEX "QazaPrayer_date_key" ON "QazaPrayer"("date");
