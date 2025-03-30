/*
  Warnings:

  - You are about to drop the column `rezorpayPaymentId` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `razorpayPaymentId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "rezorpayPaymentId",
ADD COLUMN     "razorpayPaymentId" TEXT NOT NULL;
