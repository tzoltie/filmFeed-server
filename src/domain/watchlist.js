const dbClient = require("../utils/dbClient");

const getWatchlistByUserId = async (userId) => await dbClient.watchlist.findFirst({
    where: {
        userId: userId
    },
    include: {
        films: true
    }
})

const createWatchlist = async (userId, filmId) => await dbClient.watchlist.create({
    data: {
        user: {
            connect: {
                id: userId
            }
        },
        films: {
            create: {
                film: {
                    connect: {
                        id: filmId
                    }
                }
            }
        }
    }
})

const addFilmToWatchlist = async (watchlistId, filmId) => await dbClient.usersWatchlist.create({
    data: {
        watchlistId: watchlistId,
        filmId: filmId
    }
})

module.exports = {
    getWatchlistByUserId,
    createWatchlist,
    addFilmToWatchlist
}