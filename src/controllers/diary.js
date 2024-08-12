const { addToDiary } = require("../domain/diary")
const { dataResponse } = require("../utils/responses")

const addFilmToDiary = async (req, res) => {
    const userId = Number(req.user.id)
    const filmId = Number(req.params.id)
    const loggedFilm = await addToDiary(userId, filmId)
    return dataResponse(res, 201, { film: loggedFilm })
}

module.exports = {
    addFilmToDiary
}