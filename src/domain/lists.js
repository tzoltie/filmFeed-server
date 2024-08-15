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
    },
    include: {
        filmList: true
    }
})

const getListById = async (id) => await dbClient.filmList.findFirst({
    where: {
        id: id
    }
})

const getUsersListByTitle = async (title, userId) => await dbClient.filmList.findFirst({
    where: {
        title: title,
        userId: userId
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

const checkFilmExistsInList = async (id, listId) => await dbClient.usersFilmList.findFirst({
    where: {
        filmId: id,
        filmListId: listId
    }
})

const deleteListByIdUserFilmList = async (id) => await dbClient.usersFilmList.deleteMany({
    where: {
        filmListId: id
    }
})

const deleteListByIdFilmList = async (id) => await dbClient.filmList.delete({
    where: {
        id: id
    }
})

const deleteFilmInList = async (id, listId) => await dbClient.usersFilmList.delete({
    where: {
        filmListId_filmId: {
            filmId: id,
            filmListId: listId
        }
    }
})

const getAllUsersLists = async (userId) => await dbClient.filmList.findMany({
    where: {
        userId: userId
    },
    include: {
        films: {
            include: {
                film: {
                    select: {
                        id: true,
                        title: true,
                        poster: true
                    }
                }
            }
        }
    }
})

const addManyFilmsToList = async (filmListId, films) => await dbClient.usersFilmList.createMany({
    data: films.map(film => ({
        filmId: film.id,
        filmListId: filmListId
    })),
    skipDuplicates: true
})

module.exports = {
    create,
    addFilmToList,
    getListById,
    getUsersLists,
    getUsersListById,
    checkFilmExistsInList,
    deleteListByIdUserFilmList,
    deleteListByIdFilmList,
    deleteFilmInList,
    getAllUsersLists,
    getUsersListByTitle,
    addManyFilmsToList
}