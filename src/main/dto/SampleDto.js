class SampleRequest {
    value = ""

    constructor(req) {
        const { value } = req.query
        this.value = value
    }
}

class SampleResponse {
    result = ""

    constructor() {
        this.result = "test success"
    }
}

module.exports = { SampleRequest, SampleResponse }
