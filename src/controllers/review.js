const { addFilm, getFilmById } = require("../domain/film")
const { create, getReviewById, updateReviewById, getAllFilmReviews } = require("../domain/review")
const { dataResponse } = require("../utils/responses")
const ERR = require('../utils/error')

const createReview = async (req, res) => {
    const {
        content,
        rating
    } = req.body

    const userId = Number(req.user.id)
    const filmId = Number(req.params.id)

    try {
        const findFilm = await getFilmById(filmId)
        
        if(!findFilm) {
        await addFilm(filmId)
        }
        const createdReview = await create(content, Number(rating), filmId, userId)
        return dataResponse(res, 201, { review: createdReview })
    } catch (e) {
        console.log(e)
        return dataResponse(res, 400, { error: e.message })
    }
    // in order to add a review the db will require a filmId in order to attch the review too.
    // the film id will need to be stored first before the review can be added.
    
}

const updateReview = async (req, res) => {
    const { 
        content,
        rating
    } = req.body
    const id = Number(req.params.id)
    const userId = Number(req.user.id)
    
    try {
        const found = await getReviewById(id)
        if(!found) {
            return dataResponse(res, 404, { error: ERR.REVIEW_NOT_FOUND})
        }
        if(found.userId !== userId) {
            return dataResponse(res, 403, { error: ERR.REQUEST_DENIED})
        }
        const updatedReview = await updateReviewById(id, content, Number(rating))
        return dataResponse(res, 200, { review: updatedReview })
    } catch (e) {
        dataResponse(res, 500, { error: e.message })
    }
    
}

const getAllFilmReviewByFilmId = async (req, res) => {
    const filmId = Number(req.params.id)

    try {
        const found = await getAllFilmReviews(filmId)
        if(!found) {
            return dataResponse(res, 404, { error: ERR.FILM_REVIEWS_NOT_FOUND})
    }
    return dataResponse(res, 200, { reviews: found })
    } catch(e) {
        dataResponse(res, 500, { error: e.message })
    }
    
}

module.exports = {
    createReview,
    updateReview,
    getAllFilmReviewByFilmId
}