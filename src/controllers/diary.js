const { addToDiary, getDiary } = require("../domain/diary")
const { dataResponse } = require("../utils/responses")
const ERR = require("../utils/error")

const addFilmToDiary = async (req, res) => {
    const userId = Number(req.user.id)
    const filmId = Number(req.params.id)
    const loggedFilm = await addToDiary(userId, filmId)
    return dataResponse(res, 201, { film: loggedFilm })
}

const getUsersDiary = async (req, res) => {
    const userId = Number(req.user.id)
    try {
        const found = await getDiary(userId)
        if(!found) {
            return dataResponse(res, 404, { error: ERR.DIARY_NOT_FOUND})
        }
        return dataResponse(res, 200, { diary: found })
    } catch(e) {
        return dataResponse(res, 500, { error: e.message })
    }
}

module.exports = {
    addFilmToDiary,
    getUsersDiary
}