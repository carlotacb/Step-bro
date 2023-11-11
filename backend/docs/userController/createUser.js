module.exports = {
    post: {
        tags: [
            "User Controller"
        ],
        description: "Creates a new user",
        operationId: "createUser",
        parameters: [
            {
                name: "user",
                in: "body",
                description: "User to create",
                required: true,
                schema: {
                    email: "string",
                    phone: "string",
                    username: "string",
                    password: "string",
                    bio: "string",
                    icon: "string"
                }
            }
        ],
        responses: {
            "201": {
                description: "User created successfully"
            },
            "500": {
                description: "Server error"
            }
        }
    }
}
