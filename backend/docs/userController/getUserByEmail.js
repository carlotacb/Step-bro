module.exports = {
    get: {
        tags: [
            "User controller"
        ],
        description: "Gets a user by email",
        operationId: "getUserByEmail",
        parameters: [
            {
                name: "email",
                in: "path",
                description: "Email of user to retrieve",
                required: true,
                schema: {
                    email: "string"
                }
            }
        ],
        responses: {
            "200": {
                description: "User retrieved successfully",
                schema: {
                    type: "object",
                    properties: {
                        email: "string",
                        phone: "string",
                        username: "string",
                        password: "string",
                        bio: "string",
                        icon: "string"
                    }
                }
            },
            "404": {
                description: "User not found"
            },
            "500": {
                description: "Server error"
            }
        }
    }
}