/*
  Warnings:

  - The primary key for the `Blogs` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Blogs" DROP CONSTRAINT "Blogs_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Blogs_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Blogs_id_seq";
