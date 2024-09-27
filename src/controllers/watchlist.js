const { dataResponse } = require("../utils/responses")
const ERR = require("../utils/error")
const { getWatchlistByUserId, createWatchlist, addFilmToWatchlist } = require("../domain/watchlist")
const { getFilmById, getFilmsInWatchlistByUserId } = require("../domain/film")
const { addFilm } = require("../domain/film")
const { watchlist } = require("../utils/dbClient")

const getWatchlist = async (req, res) => {
    const userId = Number(req.user.id)
    const userWatchlist = Number(req.params.id)

    if(userId !== userWatchlist) {
        return dataResponse(res, 403, { error: ERR.REQUEST_DENIED })
    }
    const found = await getFilmsInWatchlistByUserId(userId)
    if(!found) {
        return dataResponse(res, 404, { error: ERR.USER_NOT_FOUND})
    }
    return dataResponse(res, 200, { watchlist: found })
}

const addFilmToWatchlistById = async (req, res) => {
    const userId = Number(req.user.id)
    const userWatchlist = Number(req.params.id)
    const { filmId, title, poster } = req.body

    if(userId !== userWatchlist) {
        return dataResponse(res, 403, { error: ERR.REQUEST_DENIED})
    }

    const watchlistFound = await getWatchlistByUserId(userId)
    const filmFoundInDb = await getFilmById(Number(filmId))

    if(!filmFoundInDb) {
        await addFilm(Number(filmId), title, poster)
    }

    if(!watchlistFound) {
       const newWatchList = await createWatchlist(userWatchlist, Number(filmId))
       return dataResponse(res, 201, { watchlist: newWatchList})
    }
    const addedFilm = await addFilmToWatchlist(watchlistFound.id, filmId)
    return dataResponse(res, 201, { watchlist: addedFilm })
}

module.exports = {
    getWatchlist,
    addFilmToWatchlistById
}