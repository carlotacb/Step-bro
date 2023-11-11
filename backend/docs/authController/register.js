module.exports = {
    post: {
        tags: [
            "Auth Controller"
        ],
        summary: "Register",
        description: "Register",
        operationId: "register",
        parameters: [
            {
                name: "user_mail",
                in: "body",
                description: "Username",
                required: true,
            },
            {
                name: "password",
                in: "body",
                description: "Password",
                required: true,
            }
        ],
        responses: {
            "201": {
                description: "Success"
            },
            "500": {
                description: "Internal Server Error"
            }
        }
    }
}