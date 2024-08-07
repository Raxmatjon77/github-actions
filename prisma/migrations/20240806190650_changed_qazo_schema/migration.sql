/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `QazaPrayer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "QazaPrayer_userId_date_key" ON "QazaPrayer"("userId", "date");
