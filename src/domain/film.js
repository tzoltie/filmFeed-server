const dbClient = require("../utils/dbClient");

const addFilm = async (filmId, filmTitle) => await dbClient.film.create({
    data: {
        id: filmId,
        title: filmTitle
    }
})

const getFilmById = async (filmId) => await dbClient.film.findUnique({
    where: {
        id: filmId
    }
})

module.exports = {
    addFilm,
    getFilmById
}