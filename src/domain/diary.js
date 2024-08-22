const dbClient = require("../utils/dbClient");

const addToDiary = async (userId, filmId) => await dbClient.diary.create({
    data: {
        userId: userId,
        films: {
            create: {
                filmId: filmId
            }
        }
    }
})

const getDiary = async (userId) => await dbClient.diary.findFirst({
    where: {
        userId: userId
    },
    include: {
        films: true
    }
})

module.exports = {
    addToDiary,
    getDiary
}