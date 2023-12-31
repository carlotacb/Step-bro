const {UserController} = require("./userController");


const db = require("../db.js");

const AuthController = () => {
    const login =
        async (req, res) => {
            const user_mail = req.body.user_mail;
            const userPwd = req.body.password;
            try {
                const result = await db.query('SELECT * FROM users WHERE users.user_mail=$1 AND users.passwd=$2', [user_mail, userPwd]);
                if(result.rows.length === 0){
                    return res.status(401).json({success: false, message: 'Unauthorized'});
                }
                return res.status(200).json({success: true, user_mail:result.rows[0]['user_mail']});
            } catch (err) {
                console.error(err);
                return res.status(500).json('Internal Server Error');
            }
        };

    const register = async (req, res) => { 
        const userController = UserController();
        const response = await userController.createUser(req, res);
        console.log(response.body);
        if(response.status === 201){
            return res.status(200).json({success: true, token: response.body.user_mail});
        } else {    
            return res.status(500);
        }
    };

    return {
        login,
        register,
    };
    
}
module.exports = {AuthController};


