/*
  Warnings:

  - You are about to alter the column `name` on the `Campaign` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `regulationDescription` on the `Campaign` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(3000)`.
  - You are about to alter the column `slug` on the `Campaign` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - Made the column `regulationDescription` on table `Campaign` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Campaign" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "regulationDescription" SET NOT NULL,
ALTER COLUMN "regulationDescription" SET DATA TYPE VARCHAR(3000),
ALTER COLUMN "slug" SET DATA TYPE VARCHAR(50);
