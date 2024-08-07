const { create, getListById, addFilmToList, getUsersLists, getUsersListById } = require("../domain/lists")
const { dataResponse } = require("../utils/responses")
const { validateList } = require("../utils/validateUserInput")
const ERR = require('../utils/error')

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

    const found = await getListById(listId, userId)

    if(!found) {
        return dataResponse(res, 404, { error: ERR.LIST_NOT_FOUND})
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

module.exports = {
    createList,
    addFilm,
    getList
}