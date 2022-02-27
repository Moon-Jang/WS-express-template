const mysql = require("mysql2/promise")
const setting = require("../security/setting")

const pool = mysql.createPool(setting.mysql)

module.exports = {
    getConnection: async (res) => {
        const connection = await pool.getConnection(async (conn) => conn)

        res.dbConnection = connection

        if (process.env.NODE_ENV === "test") {
            connection.beginTransaction()
        }

        return connection
    },
}
