const { dataResponse } = require("../utils/responses")
const ERR = require("../utils/error")
const { getWatchlistByUserId, createWatchlist, addFilmToWatchlist } = require("../domain/watchlist")
const { getFilmById } = require("../domain/film")
const { addFilm } = require("../domain/film")

const getWatchlist = async (req, res) => {
    const userId = Number(req.user.id)
    const userWatchlist = Number(req.params.id)

    if(userId !== userWatchlist) {
        return dataResponse(res, 403, { error: ERR.REQUEST_DENIED })
    }
    const found = await getWatchlistByUserId(userWatchlist)
    if(!found) {
        return dataResponse(res, 404, { error: ERR.USER_NOT_FOUND})
    }
    return dataResponse(res, 200, { watchlist: found })
}

const addFilmToWatchlistById = async (req, res) => {
    const userId = Number(req.user.id)
    const userWatchlist = Number(req.params.id)
    const { filmId, title } = req.body

    if(userId !== userWatchlist) {
        return dataResponse(res, 403, { error: ERR.REQUEST_DENIED})
    }

    const filmFoundInDb = await getFilmById(Number(filmId))
    const found = await getWatchlistByUserId(userWatchlist)
    if(!found && !filmFoundInDb) {
        const newFilm = await addFilm(Number(filmId), title)
        const usersWatchlist = await createWatchlist(userWatchlist, Number(newFilm.id))
        return dataResponse(res, 201, { watchlist: usersWatchlist })
    }
}

module.exports = {
    getWatchlist,
    addFilmToWatchlistById
}