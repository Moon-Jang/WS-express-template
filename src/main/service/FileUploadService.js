const AwsConfig = require("../config/AwsConfig")
const UserDao = require("../dao/UserDao")

module.exports = {
    uploadImage: async (buffer, mimetype) => {
        const result = await AwsConfig.S3.upload(buffer, mimetype)
        return result
    },
}
