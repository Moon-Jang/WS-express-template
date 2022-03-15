const multer = require("multer")()
const Database = require("../config/Database")
const { LonginTestRequest } = require("../dto/sample/LonginTestDto")
const { SampleApiRequest } = require("../dto/sample/SampleApiDto")
const { TestUploadRequest } = require("../dto/sample/TestUploadDto")
const FileUploadService = require("../service/FileUploadService")
const SampleService = require("../service/SampleService")
const HttpMethod = require("../types/HttpMethod")

module.exports = {
    doExample: {
        method: HttpMethod.GET,
        path: "/example",
        handler: async (req, res, next) => {
            const request = new SampleApiRequest(req)
            res.output = await SampleService.doExample(request)
            next()
        },
    },

    testDatabaseConnection: {
        method: HttpMethod.GET,
        path: "/db-test",
        handler: async (req, res, next) => {
            const connection = await Database.getConnection(res)
            res.output = await SampleService.testDatabaseConnection(connection)
            next()
        },
    },

    healhCheck: {
        method: HttpMethod.GET,
        path: "/health-check",
        handler: async (req, res, next) => {
            res.output = "OK"
            next()
        },
    },

    loginTest: {
        method: HttpMethod.POST,
        path: "/login-test",
        handler: async (req, res, next) => {
            const request = new LonginTestRequest(req)
            const connection = await Database.getConnection(res)
            res.output = await SampleService.loginTest(request, connection)
            next()
        },
    },

    // 리팩토링 예제용
    testUpload: {
        method: HttpMethod.POST,
        path: "/test-upload",
        multipart: multer.single("img"),
        handler: async (req, res, next) => {
            const { buffer, mimetype } = new TestUploadRequest(req)
            const result = await FileUploadService.uploadImage(buffer, mimetype)
            res.output = { imageUrl: result }
            next()
        },
    },
}
