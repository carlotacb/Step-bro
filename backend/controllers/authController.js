const db = require("../db.js");
const { generateToken } = require("./tokenController.js");

const {UserController} = require("./userController");


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
                return res.status(200).json({success: true, token: await generateToken(user_mail)});
            } catch (err) {
                console.error(err);
                return res.status(500).json('Couldn\'t login. Something went wrong.');
            }
        };

    const register = async (req, res) => { 
        const userController = UserController();
        const response = await userController.createUser(req, res);
        
        if(response.status === 201){
            return res.status(201); // SEE userController.createUser function, which returns overrites this line
        } else {    
            return res.status(500);
        }
    };

    const closeSession = async (req, res) => {
        const result = await revokeToken(req.get('token'));
        if(result){
          res.status(200).json({ success: true, message: 'Session closed and token revoked' });
        } else {
          res.status(400).json({ success: false, message: 'Session not closed and token not revoked'});
        }
      }

    return {
        login,
        register,
        closeSession
    };
    
}
module.exports = {AuthController};


