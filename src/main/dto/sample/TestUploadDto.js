class TestUploadRequest {
    buffer = null
    mimetype = null

    constructor(req) {
        const { buffer, mimetype } = req.file
        this.buffer = buffer
        this.mimetype = mimetype
        this.validate()
    }

    validate() {
        if (!this.buffer || !this.mimetype) {
            throw Error("이미지 파일을 넣어주세요.")
        }

        if (!this.mimetype.startsWith("image/")) {
            throw Error("이미지 파일만 등록이 가능합니다.")
        }
    }
}

module.exports = { TestUploadRequest }
