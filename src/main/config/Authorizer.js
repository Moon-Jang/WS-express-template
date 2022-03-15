const Auth = require("./Auth")
const Database = require("./Database")
const AuthService = require("../service/AuthService")
const HttpMethod = require("../types/HttpMethod")
const AsyncWrapper = require("./AsyncWrapper")

module.exports = {
    handle: AsyncWrapper.wrap(async (req, res, next) => {
        // 포스트맨으로 호출시 마스터 권한부여 및 패스
        if (req?.headers["user-agent"]?.startsWith("Postman")) {
            // 마스터권한 부여
            const masterId = 99999
            const authLevel = 99

            req.userDetail = {
                id: masterId,
                al: authLevel,
            }

            next()
            return
        }

        const path = req.path
        const method = req.method

        // 패스리스트에 작성된 api는 토큰 검사안하고 패스
        const isPass = passList.some((el) => new RegExp(el.path).test(path) && el.method.name === method)

        if (isPass) {
            next()
            return
        }

        //토큰검사
        const { authorization } = req.headers

        if (!authorization) {
            throw Error("인증 토큰이 없습니다.")
        }

        const token = authorization.replace(/Bearer[+\s]/g, "")
        const jwtPayload = Auth.verifyToken(token)
        const connection = await Database.getConnection(res)

        // 실제 존재하는 유저인지 검사
        await AuthService.checkUser(jwtPayload, connection)

        req.userDetail = jwtPayload
        res.dbConnection = null
        connection.release()
        next()
    }),
}

const numberPattern = "/\\d+"
const allPattern = "/\\w+"

const passList = [
    {
        path: "/example",
        method: HttpMethod.GET,
    },
    {
        path: "/db-test",
        method: HttpMethod.GET,
    },
    {
        path: "/login-test",
        method: HttpMethod.POST,
    },
    {
        path: "/health-check",
        method: HttpMethod.GET,
    },
    {
        path: "/test-upload",
        method: HttpMethod.POST,
    },
]
