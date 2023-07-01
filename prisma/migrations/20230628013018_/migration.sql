/*
  Warnings:

  - You are about to drop the column `completed` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "completed",
ADD COLUMN     "complete" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Employee";
