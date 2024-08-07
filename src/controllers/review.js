const { addFilm } = require("../domain/film")
const { create } = require("../domain/review")
const { dataResponse } = require("../utils/responses")
const { validateFilm } = require("../utils/validateUserInput")

const createReview = async (req, res) => {
    const {
        content,
        rating
    } = req.body

    const userId = Number(req.user.id)
    const filmId = Number(req.params.id)

    try {
        validateFilm(filmId)
    } catch (e) {
        return dataResponse(res, 400, { error: e.message })
    }
    // in order to add a review the db will require a filmId in order to attch the review too.
    // the film id will need to be stored first before the review can be added.
    await addFilm(filmId)
    const createdReview = await create(content, rating, filmId, userId)
    return dataResponse(res, 201, { review: createdReview })
}

module.exports = {
    createReview
}