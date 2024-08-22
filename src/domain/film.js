const { title } = require("process");
const dbClient = require("../utils/dbClient");

const addFilm = async (filmId, filmTitle, filmPoster) => await dbClient.film.create({
    data: {
        id: filmId,
        title: filmTitle,
        poster: filmPoster
    }
})

const getFilmById = async (filmId) => await dbClient.film.findUnique({
    where: {
        id: filmId
    }
})

const getFilmsInWatchlistByUserId = async (userId) => await dbClient.film.findMany({
    where: {
        watchlists: {
            some: {
                watchlist: {
                    userId: userId
                }
            }
        }
    },
    include: {
        reviews: true,
        notes: true
    }
})

const addManyFilms = async (films) => await dbClient.film.createMany({
    data: films.map(film => ({
        id: film.id,
        title: film.title,
        poster: film.poster_path
    })),
    skipDuplicates: true
})

const findManyFilms = async (filmIds) => await dbClient.film.findMany({
    where: {
        id: {in: filmIds}
    },
    select: {
        id: true
    }
})

module.exports = {
    addFilm,
    getFilmById,
    getFilmsInWatchlistByUserId,
    addManyFilms,
    findManyFilms
}