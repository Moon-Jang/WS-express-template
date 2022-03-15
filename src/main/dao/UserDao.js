const CryptoUtil = require("../config/CryptoUtil")

module.exports = {
    findUserById: async (id, connection) => {
        const sql = `
            SELECT *
            FROM user
            WHERE id = ?; 
        `

        const [rows] = await connection.execute(sql, [id])

        if (rows.length < 0) {
            throw Error("존재하지 않는 사용자입니다.")
        }

        return rows[0]
    },

    findUserByEmail: async (email, connection) => {
        const sql = `
            SELECT *
            FROM user
            WHERE email = ?; 
        `

        const [rows] = await connection.execute(sql, [CryptoUtil.encrypt(email)])

        if (rows.length < 0) {
            throw Error("존재하지 않는 사용자입니다.")
        }

        return rows[0]
    },
}
