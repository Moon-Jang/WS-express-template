class SampleApiRequest {
    value = ""
    error = false

    constructor(req) {
        const { value, error } = req.query
        this.value = value
        this.error = error
    }
}

class SampleApiResponse {
    result = ""

    constructor() {
        this.result = "Sample success"
    }
}

module.exports = { SampleApiRequest, SampleApiResponse }
