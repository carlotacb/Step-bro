module.exports = {
    get: {
        tags: [
            "User Controller"
        ],
        description: "Gets all users",
        operationId: "getAllUsers",
        responses: {
            "200": {
                description: "Users retrieved successfully",
                schema: {
                    type: "array",
                }
            },
            "500": {
                description: "Server error"
            }
        }
    }
}