/*
  Warnings:

  - You are about to drop the column `title` on the `FilmList` table. All the data in the column will be lost.
  - Added the required column `listId` to the `FilmList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FilmList" DROP CONSTRAINT "FilmList_userId_fkey";

-- AlterTable
ALTER TABLE "FilmList" DROP COLUMN "title",
ADD COLUMN     "listId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "UsersFilmList" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersFilmList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FilmList" ADD CONSTRAINT "FilmList_listId_fkey" FOREIGN KEY ("listId") REFERENCES "UsersFilmList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersFilmList" ADD CONSTRAINT "UsersFilmList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
