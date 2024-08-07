const dbClient = require("../utils/dbClient");

const create = async (content, rating, filmId, userId) => await dbClient.review.create({
    data: {
        content: content,
        rating: rating,
        filmId: filmId,
        userId: userId
    }
})

module.exports = {
    create
}