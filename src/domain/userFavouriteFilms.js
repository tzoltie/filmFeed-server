const dbClient = require('../utils/dbClient')

const addFavouriteFilms = async (userId, films) => await dbClient.usersFavouriteFilms.createMany({
    data: films.map(film => ({
        filmId: film.id,
        userId: userId
    }))
})

const getFavouriteFilms = async (userId) => dbClient.usersFavouriteFilms.findFirst({
    where: {
        userId: userId
    },
    include: {
        film: {
            select: {
                poster: true
            }
        }
    }
})

const updateFavouriteFilms = async (userId, filmIds) => {filmIds.map(update => {return dbClient.usersFavouriteFilms.updateMany({
    where: {
        userId: userId
    },
    data: {
        filmId: update.filmId
    },
    include: {
        film: {
            select: {
                poster: true
            }
        }
    }
})})}

module.exports = {
    addFavouriteFilms,
    updateFavouriteFilms,
    getFavouriteFilms
}