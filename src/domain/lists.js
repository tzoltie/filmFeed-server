const { title } = require('process')
const dbClient = require('../utils/dbClient')

const create = async (title, userId) => await dbClient.filmList.create({
    data: {
        title: title,
        userId: userId
    }
})

const addFilmToList = async (filmId, listId) => await dbClient.usersFilmList.create({
    data: {
        filmId: filmId,
        filmListId: listId
    }
})

const getListById = async (userId, id) => await dbClient.filmList.findFirst({
    where: {
        userId: userId,
        id: id
    }
})

const getUsersListById = async (id) => await dbClient.usersFilmList.findFirst({
    where: {
        filmListId: id
    },
    include: {
       film: true
    }
})

const getUsersLists = async (userId, id) => await dbClient.filmList.findFirst({
    where: {
        userId: userId,
        id: id
    }
})


module.exports = {
    create,
    addFilmToList,
    getListById,
    getUsersLists,
    getUsersListById
}