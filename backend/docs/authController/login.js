module.exports = {
    "post": {
        "tags": [
            "Auth Controller"
        ],
        "summary": "Login",
        "description": "Login",
        "operationId": "login",
        "parameters": [
        {
            "user_mail": "user_mail",
            "in": "body",
            "description": "Username",
            "required": true,
        },
        {
            "name": "password",
            "in": "body",
            "description": "Password",
            "required": true,
        }
        ],
        "responses": {
        "200": {
            "description": "Success"
        },
        "401": {
            "description": "Unauthorized"
        },
        "500": {
            "description": "Internal Server Error"
        }
        }
    }
}