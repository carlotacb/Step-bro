module.exports = {
    delete: {
        tags: [
            "User Controller"
        ],
        description: "Deletes a user",
        operationId: "deleteUser",
        parameters: [
            {
                name: "email",
                in: "path",
                description: "Email of user to delete",
                required: true,
                schema: {
                    email: "string"
                }
            }
        ],
        responses: {
            "204": {
                description: "User deleted successfully"
            },
            "500": {
                description: "Server error"
            }
        }
    }
}