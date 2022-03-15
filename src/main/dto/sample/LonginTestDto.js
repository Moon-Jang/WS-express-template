class LonginTestRequest {
    email = ""
    password = ""

    constructor(req) {
        const { email, password } = req.body
        this.email = email
        this.password = password
        this.validate()
    }

    validate() {
        if (!this.email) {
            throw Error("이메일을 입력해주세요.")
        }

        if (!this.password) {
            throw Error("패스워드를 입력해주세요.")
        }
    }
}

class LonginTestResponse {
    result = ""

    constructor() {
        this.result = "Sample success"
    }
}

module.exports = { LonginTestRequest, LonginTestResponse }
