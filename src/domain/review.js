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
    },
    include: {
        user: {
            include: {
                profile: true
            }
        }
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

const getReviewsByUserId = async (userId) => await dbClient.review.findMany({
    where: {
        userId: userId
    },
    include: {
        film: true
    }
})

const getAllReviews = async () => await dbClient.review.findMany({
    include: {
        film: true
    }
})

module.exports = {
    create,
    getReviewById,
    getAllFilmReviews,
    updateReviewById,
    getReviewsByUserId,
    getAllReviews
}