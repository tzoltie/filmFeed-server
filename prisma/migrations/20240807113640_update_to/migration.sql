/*
  Warnings:

  - The primary key for the `FilmList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FilmList` table. All the data in the column will be lost.
  - You are about to drop the `UsersFilmList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsersFilmList" DROP CONSTRAINT "UsersFilmList_listId_fkey";

-- DropForeignKey
ALTER TABLE "UsersFilmList" DROP CONSTRAINT "UsersFilmList_userId_fkey";

-- AlterTable
ALTER TABLE "FilmList" DROP CONSTRAINT "FilmList_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "FilmList_pkey" PRIMARY KEY ("userId", "filmId");

-- DropTable
DROP TABLE "UsersFilmList";

-- AddForeignKey
ALTER TABLE "FilmList" ADD CONSTRAINT "FilmList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
