const UserController = require("./userController");

const AuthController = () => {
    const login =
        async (req, res) => {
            const username = req.body.user;
            const userPwd = req.body.pwd;
            try {
                const result = await pool.query('SELECT * FROM users WHERE users.username=$1 AND users.passwd=$2', [username, userPwd]);
                if(result.rows.length === 0){
                    return res.status(401).send('Unauthorized');
                }
                return res.status(200).json(result.rows[0]['email']);
            } catch (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
        };

    const register = async (req, res) => { 
        const response = await UserController.createUser(req, res);
        //TODO TOKEN MANAGMENT
        if(response.status === 201){
            return res.status(201).send(response);
        } else {    
            return res.status(500).send(response);
        }
    };

    return {
        login,
        register,
    };
    
}
module.exports = {AuthController};


