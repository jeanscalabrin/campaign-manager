/*
  Warnings:

  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Campaign` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_campaignId_fkey";

-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "instructionFileUrl" TEXT,
ADD COLUMN     "regulationDescription" TEXT,
ADD COLUMN     "regulationFileUrl" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL;

-- DropTable
DROP TABLE "Document";

-- DropEnum
DROP TYPE "DocumentType";

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_slug_key" ON "Campaign"("slug");
