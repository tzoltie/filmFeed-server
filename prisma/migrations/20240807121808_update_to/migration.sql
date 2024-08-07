/*
  Warnings:

  - The primary key for the `FilmList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `filmId` on the `FilmList` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "FilmList" DROP CONSTRAINT "FilmList_filmId_fkey";

-- AlterTable
ALTER TABLE "FilmList" DROP CONSTRAINT "FilmList_pkey",
DROP COLUMN "filmId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "FilmList_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "UsersFilmList" (
    "filmListId" INTEGER NOT NULL,
    "filmId" INTEGER NOT NULL,

    CONSTRAINT "UsersFilmList_pkey" PRIMARY KEY ("filmListId","filmId")
);

-- AddForeignKey
ALTER TABLE "UsersFilmList" ADD CONSTRAINT "UsersFilmList_filmListId_fkey" FOREIGN KEY ("filmListId") REFERENCES "FilmList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersFilmList" ADD CONSTRAINT "UsersFilmList_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
