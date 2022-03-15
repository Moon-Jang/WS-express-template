const Auth = require("../config/Auth")
const CryptoUtil = require("../config/CryptoUtil")
const SampleDao = require("../dao/SampleDao")
const UserDao = require("../dao/UserDao")

module.exports = {
    doExample: (request) => {
        if (request.error) {
            throw Error("Error")
        }

        if (!request.value) {
            return "example API"
        }

        return request.value
    },

    testDatabaseConnection: async (connection) => {
        const result = await SampleDao.testDatabaseConnection(connection)

        if (result === false) {
            throw Error("연결 실패")
        }

        return "연결 성공"
    },

    loginTest: async (request, connection) => {
        const user = await UserDao.findUserByEmail(request.email, connection)

        if (CryptoUtil.comparePassword(request.password, user.password)) {
            throw Error("비밀번호가 일치 하지않습니다.")
        }

        return Auth.signToken(user.id)
    },
}
