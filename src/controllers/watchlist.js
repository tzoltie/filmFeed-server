const { dataResponse } = require("../utils/responses")
const ERR = require("../utils/error")
const { getWatchlistByUserId, createWatchlist } = require("../domain/watchlist")
const { getFilmById, getFilmsInWatchlistByUserId } = require("../domain/film")
const { addFilm } = require("../domain/film")

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

    const filmFoundInDb = await getFilmById(Number(filmId))
    if(!filmFoundInDb) {
        const newFilm = await addFilm(Number(filmId), title, poster)
        const usersWatchlist = await createWatchlist(userWatchlist, Number(newFilm.id))
    }
    
    const filmsInWatchlist = await getFilmsInWatchlistByUserId(userId)
    console.log(filmsInWatchlist)
    return dataResponse(res, 201, { watchlist: filmsInWatchlist })
}

module.exports = {
    getWatchlist,
    addFilmToWatchlistById
}