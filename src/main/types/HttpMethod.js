const HttpMethod = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete",

    has: (method) => {
        return Object.keys(HttpMethod).some((el) => HttpMethod[el] === method)
    },
}

module.exports = HttpMethod
