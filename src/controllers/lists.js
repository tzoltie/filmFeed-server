const { create, getListById, addFilmToList, getUsersLists, getUsersListById, checkFilmExistsInList, deleteListByIdUserFilmList, deleteListByIdFilmList } = require("../domain/lists")
const { dataResponse } = require("../utils/responses")
const { validateList } = require("../utils/validateUserInput")
const ERR = require('../utils/error')
const { error } = require("console")
const dbClient = require("../utils/dbClient")

const createList = async (req, res) => {
    const {
        title
    } = req.body
    const userId = Number(req.user.id)

    try {
        validateList(title)
    } catch(e) {
        return dataResponse(res, 400, { error: e.message })
    }
    const createdList = await create(title, userId)
    return dataResponse(res, 201, { list: createdList })
}

const addFilm = async (req, res) => {
    const {
        filmId
    } = req.body
    const listId = Number(req.params.id)
    const userId = Number(req.user.id)

    const found = await getListById(listId)

    if(!found) {
        return dataResponse(res, 404, { error: ERR.LIST_NOT_FOUND})
    }
    if(found.userId !== userId) {
        return dataResponse(res, 403, { error: ERR.REQUEST_DENIED })
    }
    const updatedList = await addFilmToList(Number(filmId), listId)
    return dataResponse(res, 200, { list: updatedList })
}

const getList = async (req, res) => {
    const id = Number(req.params.id)
    const userId = Number(req.user.id)

    const foundUsersList = await getUsersLists(id, userId)
    if(!foundUsersList) {
        return dataResponse(res, 404, { error: ERR.LIST_NOT_FOUND })
    }
    const found = await getUsersListById(id)

    if(!found) {
        return dataResponse(res, 404, { error: ERR.LIST_NOT_FOUND })
    }

    return dataResponse(res, 200, { list: found })
}

const updateList = async (req, res) => {
    const { filmId } = req.body
    const listId = Number(req.params.id)
    const userId = Number(req.user.id)

    const found = await getListById(listId)

    if(!found) {
        return dataResponse(res, 404, { error: ERR.LIST_NOT_FOUND})
    }
    if(found.userId !== userId) {
        return dataResponse(res, 403, { error: ERR.REQUEST_DENIED })
    }
    const filmAlreadyInList = await checkFilmExistsInList(Number(filmId), listId)
    if(filmAlreadyInList) {
        return dataResponse(res, 400, { error: ERR.FILM_EXISTS_IN_LIST})
    }
    const updatedList = await addFilmToList(Number(filmId), listId)
    return dataResponse(res, 201, { list: updatedList })
}

const deleteList = async (req, res) => {
    const listId = Number(req.params.id)
    const userId = Number(req.user.id)

    const found = await getListById(listId)

    if(!found) {
        return dataResponse(res, 404, { error: ERR.LIST_NOT_FOUND})
    }
    if(found.userId !== userId) {
        return dataResponse(res, 403, { error: ERR.REQUEST_DENIED })
    }
    const deletedUsersFilmList = await deleteListByIdUserFilmList(found.id)
    const deletedList = await deleteListByIdFilmList(found.id)
    return dataResponse(res, 200, { list: deletedList })
}

module.exports = {
    createList,
    addFilm,
    getList,
    updateList,
    deleteList
}