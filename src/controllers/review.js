const { addFilm, getFilmById } = require("../domain/film")
const { create, getReviewById, updateReviewById, getAllFilmReviews, getReviewsByUserId, getAllReviews } = require("../domain/review")
const { dataResponse } = require("../utils/responses")
const ERR = require('../utils/error')

const createReview = async (req, res) => {
    const {
        content,
        rating,
        film
    } = req.body

    const { 
        poster,
        title 
    } = film

    const userId = Number(req.user.id)
    const filmId = Number(req.params.id)

    try {
        const findFilm = await getFilmById(filmId)
        
        if(!findFilm) {
        await addFilm(filmId, title, poster)
        }
        const createdReview = await create(content, Number(rating), filmId, userId)
        return dataResponse(res, 201, { review: createdReview })
    } catch (e) {
        return dataResponse(res, 400, { error: e.message })
    }
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
    delete found.passwordHash
    return dataResponse(res, 200, { reviews: found })
    } catch(e) {
        dataResponse(res, 500, { error: e.message })
    }
    
}

const getAllReviewsByUserId = async (req, res) => {
    const userId = Number(req.user.id)
    try {
        const found = await getReviewsByUserId(userId)
        if(!found) {
            return dataResponse(res, 404, { error: ERR.USER_REVIEWS_NOT_FOUND})
        }
        return dataResponse(res, 200, { reviews: found })
    } catch(e) {
        return dataResponse(res, 500, { error: e.message })
    }
    
}

const getReviews = async (req, res) => {
    try {
        const found = await getAllReviews()
        if(!found) {
            return dataResponse(res, 404, { error: ERR.REVIEWS_NOT_FOUND})
        }
        return dataResponse(res, 200, { reviews: found})
    } catch(e) {
        return dataResponse(res, 500, { error: e.message })
    }
}

module.exports = {
    createReview,
    updateReview,
    getAllFilmReviewByFilmId,
    getAllReviewsByUserId,
    getReviews
}