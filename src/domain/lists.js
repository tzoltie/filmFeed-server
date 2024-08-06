const dbClient = require('../utils/dbClient')

const create = async (title, userId) => await dbClient.usersFilmList.create({
    data: {
        title: title,
        userId: userId
    }
})

const getListByTitle = async (title, userId) => await dbClient.usersFilmList.findFirst({
    where: {
        title: title,
        userId: userId
    }
})

const addFilm = async (userId, filmId, listId) => await dbClient.filmList.create({
    data: {
        userId: userId,
        listId: listId,
        filmId: filmId
    }
})

const updateList = async (title, userId) => await dbClient.usersFilmList.update({
    where: {
        title: title,
        userId: userId
    },
    data: {
        title: title
    }
})

const getListById = async (id, userId) => await dbClient.filmList.findUnique({
    where: {
        listId: id,
        userId: userId
    },
    include: {
        film: true
    }
})

module.exports = {
    create,
    getListByTitle,
    updateList,
    addFilm,
    getListById
}