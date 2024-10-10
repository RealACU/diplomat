-- CreateEnum
CREATE TYPE "States" AS ENUM ('AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY');

-- CreateTable
CREATE TABLE "Tourney" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" "States" NOT NULL,
    "zip" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "primaryColorHex" TEXT NOT NULL,
    "secondaryColorHex" TEXT NOT NULL,

    CONSTRAINT "Tourney_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Committee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "roomNumber" TEXT NOT NULL,
    "bgGuideLink" TEXT NOT NULL,
    "chairIds" TEXT[],
    "delegateIds" TEXT[],
    "tourneyId" TEXT,

    CONSTRAINT "Committee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DelegateResult" (
    "id" SERIAL NOT NULL,
    "delegateId" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,
    "committeeId" INTEGER,

    CONSTRAINT "DelegateResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Committee" ADD CONSTRAINT "Committee_tourneyId_fkey" FOREIGN KEY ("tourneyId") REFERENCES "Tourney"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DelegateResult" ADD CONSTRAINT "DelegateResult_committeeId_fkey" FOREIGN KEY ("committeeId") REFERENCES "Committee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
