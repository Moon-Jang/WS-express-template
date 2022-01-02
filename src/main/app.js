const express = require("express")
const mysql = require("mysql2/promise")
const cors = require("cors")
const ResponseHandler = require("./config/ResponseHandler")
const ErrorHandler = require("./config/ErrorHandler")
const AsyncWrapper = require("./config/AsyncWrapper")
const setting = require("./security/setting")
const app = express()
const port = process.env.NODE_ENV === "test" ? 18080 : 8080
app.use(express.json()) // json으로 들어온 요청을 parsing 해준다.
app.use(cors()) // cors 설정

console.log("환경변수: ", process.env.NODE_ENV)

app.get("/example", AsyncWrapper.wrap(exampleFunc))
async function exampleFunc(req, res, next) {
    const { error } = req.query

    if (error === "true") {
        throw Error("잘못된 요청입니다.")
    }

    res.output = "example API"
    next()
}

app.get("/db-test", AsyncWrapper.wrap(dbTestFunc))
async function dbTestFunc(req, res, next) {
    const connection = await mysql.createConnection(setting.mysql) // setting.js 필요!!
    const [rows] = await connection.execute("SELECT 1", [])

    if (rows[0]["1"] !== 1) {
        throw Error("연결 실패")
    }

    res.output = "연결 성공"
    next()
}

app.use(ErrorHandler.handle) // 에러 핸들러
app.use(ResponseHandler.handle) // 응답 핸들러

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

module.exports = app
