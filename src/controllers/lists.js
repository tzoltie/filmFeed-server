const { getListByTitle, create, addFilm, getListById } = require("../domain/lists")
const { dataResponse } = require("../utils/responses")
const { validateList } = require("../utils/validateUserInput")
const ERR = require('../utils/error')

const createList = async (req, res) => {
    const {
        title
    } = req.body
    const user = req.user

    try {
        validateList(title)
    } catch(e) {
        return dataResponse(res, 400, { error: e.message })
    }
    const createdList = await create(title, user.userId)
    return dataResponse(res, 201, { list: createdList })
}

const addFilmtoList = async (req, res) => {
    const {
        filmId,
        title
    } = req.body
    const user = req.user

    try {
        const found = await getListByTitle(title, user.userId)
        if(!found) {
            return dataResponse(res, 404, { error: ERR.LIST_NOT_FOUND})
        }
        const updatedList = await addFilm(filmId, user.userId, found.id)
        return dataResponse(res, 201, { list: updatedList })
    } catch(e) {
        return dataResponse(res, 400, { error: e.message})
    }
}

const getListByName = async (req, res) => {
    const {
        title
    } = req.body
    const user = req.user

    const usersList = await getListByTitle(title, user.userId)
    return (dataResponse(res, 200, { list: usersList }))
}

const updateList = async (req, res) => {
    const {
        title,
        filmId
    } = req.body
    const user = req.user
    try {
        const found = await getListByTitle(title, user.userId)
        if(!found) {
            return dataResponse(res, 404, { error: ERR.LIST_NOT_FOUND })
        }
    } catch (e) {
        return dataResponse(res, 400, { error: e.message })
    }
    const updatedList = await updateList(title, filmId, user.userId)
    return dataResponse(res, 200, { list: updatedList })
}

const getList = async (req, res) => {
    const { listId } = req.body
    const user = req.user

    const found = await getListById(listId, user.userId)
    if(!found) {
        return dataResponse(res, 404, { error: ERR.LIST_NOT_FOUND })
    }
    return dataResponse(res, 200, { list: found })
}

module.exports = {
    createList,
    getListByName,
    updateList,
    addFilmtoList,
    getList
}