-- CreateTable
CREATE TABLE "UsersFavouriteFilms" (
    "filmId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UsersFavouriteFilms_pkey" PRIMARY KEY ("filmId","userId")
);

-- AddForeignKey
ALTER TABLE "UsersFavouriteFilms" ADD CONSTRAINT "UsersFavouriteFilms_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersFavouriteFilms" ADD CONSTRAINT "UsersFavouriteFilms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
