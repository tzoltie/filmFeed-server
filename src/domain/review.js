const dbClient = require("../utils/dbClient");

const create = async (content, rating, filmId, userId) => await dbClient.review.create({
    data: {
        content: content,
        rating: rating,
        filmId: filmId,
        userId: userId
    }
})

const getReviewById = async (id) => await dbClient.review.findUnique({
    where: {
        id: id
    }
})

const getAllFilmReviews = async (filmId) => await dbClient.review.findMany({
    where: {
        filmId: filmId
    }
})

const updateReviewById = async (id, content, rating) => await dbClient.review.update({
    where: {
        id: id
    },
    data: {
        content: content,
        rating: rating
    }
})

module.exports = {
    create,
    getReviewById,
    getAllFilmReviews,
    updateReviewById
}