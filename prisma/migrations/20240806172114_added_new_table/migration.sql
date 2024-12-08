-- CreateTable
CREATE TABLE "QazaPrayer" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "fajr" BOOLEAN NOT NULL,
    "dhuhr" BOOLEAN NOT NULL,
    "asr" BOOLEAN NOT NULL,
    "maghrib" BOOLEAN NOT NULL,
    "isha" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "QazaPrayer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QazaPrayer" ADD CONSTRAINT "QazaPrayer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
