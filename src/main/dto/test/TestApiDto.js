class TestApiRequest {
    value = ""

    constructor(req) {
        const { value } = req.query
        this.value = value
    }
}

class TestApiResponse {
    result = ""

    constructor() {
        this.result = "test success"
    }
}

module.exports = { TestApiRequest, TestApiResponse }
