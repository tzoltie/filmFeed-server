const dbClient = require("../utils/dbClient");

const addFilm = async (filmId) => await dbClient.film.create({
    data: {
        id: filmId
    }
})

module.exports = {
    addFilm
}