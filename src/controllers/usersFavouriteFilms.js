const { dataResponse } = require("../utils/responses")
const ERR = require('../utils/error')
const { addFavouriteFilms, updateFavouriteFilms, getFavouriteFilms } = require("../domain/userFavouriteFilms")
const { getFilmById, findManyFilms, addManyFilms } = require("../domain/film")

const addUsersFavouriteFilms = async (req, res) => {
    const userId = Number(req.user.id)
    const requestUserId = Number(req.params.id)
    const {
        films
    } = req.body
    try {
        if(userId !== requestUserId) {
            return dataResponse(res, 403, { error: ERR.REQUEST_DENIED })
        }
        const addFilmsToDb = await addManyFilms(films)
        const updatedFavouriteFilms = await addFavouriteFilms(userId, films)
        
        return dataResponse(res, 200, {favourites: updatedFavouriteFilms})
    } catch(e) {
        console.log(e)
        return dataResponse(res, 500, {error: ERR.SOMETHING_WENT_WRONG})
    }
}

const getUsersFavouriteFilms = async (req, res) => {
    const requestUserId = Number(req.params.id)
    try {
        const found = await getFavouriteFilms(requestUserId)
        if(!found) {
            return dataResponse(res, 404, { error: ERR.FAVOURITE_FILMS_NOT_FOUND })
        }
        return dataResponse(res, 200, { favourites: found})
    } catch(e) {
        return dataResponse(res, 500, { error: ERR.SOMETHING_WENT_WRONG})
    }
}

const updateUsersFavouriteFilms = async (req, res) => {
    const userId = Number(req.user.id)
    const requestUserId = Number(req.params.id)
    const {
        filmIds
    } = req.body

    try {
        if(userId !== requestUserId) {
            return dataResponse(res, 403, { error: ERR.REQUEST_DENIED })
        }
        const updatedFavourites = await updateFavouriteFilms(requestUserId, filmIds)
        return dataResponse(res, 200, {favourites: updatedFavourites})
    } catch(e) {
        return dataResponse(res, 500, {error: ERR.SOMETHING_WENT_WRONG})
    }
}

module.exports = {
    addUsersFavouriteFilms,
    updateUsersFavouriteFilms,
    getUsersFavouriteFilms
}