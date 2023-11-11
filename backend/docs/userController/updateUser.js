module.exports = {
    put: {
        tags: [
            "User Controller"
        ],
        description: "Updates a user",
        operationId: "updateUser",
        parameters: [
            {
                name: "email",
                in: "path",
                description: "Email of user to update",
                required: true,
                schema: {
                    email: "string"
                }
            },
            {
                name: "user",
                in: "body",
                description: "User to update",
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
            "200": {
                description: "User updated successfully"
            },
            "500": {
                description: "Server error"
            }
        }
    },
}