/*
  Warnings:

  - You are about to drop the column `listId` on the `FilmList` table. All the data in the column will be lost.
  - Added the required column `listId` to the `UsersFilmList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FilmList" DROP CONSTRAINT "FilmList_listId_fkey";

-- AlterTable
ALTER TABLE "FilmList" DROP COLUMN "listId";

-- AlterTable
ALTER TABLE "UsersFilmList" ADD COLUMN     "listId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "UsersFilmList" ADD CONSTRAINT "UsersFilmList_listId_fkey" FOREIGN KEY ("listId") REFERENCES "FilmList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
