const SampleDao = require("../dao/SampleDao")

module.exports = {
    doExample: (request) => {
        this.dbConnection = "테스트"
        return "hello"
    },
    testDatabaseConnection: async (connection) => {
        const result = await SampleDao.doExample(connection)

        if (result === false) {
            throw Error("연결 실패")
        }

        return "연결 성공"
    },
}
