const db = require("../db.js");

const UserController = () => {

  const createUser = async (req, res) => {
    const user_mail = req.body.user_mail;
    const username = req.body.username;
    const userPwd = req.body.password;
    const phone = req.body.phone;
    const bio = req.body.bio;
    const icon = req.body.icon;
    //check if mail exists
    try {
      const result = await db.query('SELECT * FROM users WHERE users.user_mail=$1', [user_mail]);
      if(result.rows.length > 0){
        return res.status(409).json({success:false, message:'Email already exists'});
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({success:false, message:'Internal Server Error'});
    }

    // check if phone
    try {
      const result = await db.query('SELECT * FROM users WHERE users.phone_number=$1', [phone]);
      if(result.rows.length > 0){
        return res.status(409).json({success:false, message:'Phone already exists'});
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({success:false, message:'Internal Server Error'});
    }


    // create user
    console.log(req.body);
    try {
      const result = await db.query('INSERT INTO users(user_mail, phone_number, username, passwd, bio, icon) VALUES($1, $2, $3, $4, $5, $6);', [user_mail, phone, username, userPwd, bio, icon]);
      const user = await db.query('SELECT * FROM users WHERE users.user_mail=$1', [user_mail]);
      return res.status(201).json({success:true, token:user.rows[0].user_mail});
    } catch (err) {
      console.error(err);
      return res.status(500).json({success:false, message:'Internal Server Error'});
    }
  };

  const getUserByEmail = async (req, res) => {
    const userEmail = req.params.email;
    try {
      const result = await db.query('SELECT user_mail,phone_number,username,bio,icon,creation_date,lastupdate_date FROM users WHERE users.user_mail=$1', [userEmail]);
      if (result.rows.length > 0) {
        return res.status(200).json({ success: true, user: result.rows[0] });
      } else {
        return res.status(404).json({ success: false, message: 'User not Found' });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({success:false, message:'Internal Server Error'});
    }

  };

  const getUserByToken = async (req, res) => {
    const token = req.get['token'];
    try {
      const result = await db.query('SELECT user_mail,phone_number,username,bio,icon,creation_date,lastupdate_date FROM users WHERE users.user_mail=$1', [token]);
      if (result.rows.length > 0) {
        return res.status(200).json({ success: true, user: result.rows[0] });
      } else {
        return res.status(404).json({ success: false, message: 'User not Found' });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({success:false, message:'Internal Server Error'});
    }

  };

  


  const updateUser = async (req, res) => {
    try {
      const email = req.get('token');
      let originalUser;
      try {
        const userResponse = await db.query('SELECT * FROM users WHERE user_mail=$1', [email]);
        if (userResponse.rows.length === 0) {
            return res.status(404).send('User not found');
        }
        else {
            originalUser = userResponse;
        }
      }
      catch (err) {
          console.error(err);
          return res.status(500).json({success:false, message:'Internal Server Error'});
      }

      const username = req.body.username ?? originalUser.rows[0].username;
      const userPwd = req.body.password ?? originalUser.rows[0].passwd;
      const bio = req.body.bio ?? originalUser.rows[0].bio;
      const icon = req.body.icon ?? originalUser.rows[0].icon;
      const result = await db.query('UPDATE users SET username = $1,	passwd = $2, bio = $3, icon = $4 WHERE user_mail = $5;', [username, userPwd, bio, icon, email]);
      
        return res.status(200).json({ success: true});
    } catch (err) {
      console.error(err);
      return res.status(500).json({success:false, message:'Internal Server Error'});
    }
  };

  const deleteUser = async (req, res) => {
    try {
      const email = req.get('token');
      const result = await db.query('DELETE FROM users WHERE user_mail = $1;', [email]);
      return res.status(204).json({ success: true});
    } catch (err) {
      console.error(err);
      return res.status(500).json({success:false, message:'Internal Server Error'});
    }
  }

  const getAllUsers = async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM users');
      return res.send(result.rows);

    } catch (err) {
      console.error(err);
      return res.status(500).json({success:false, message:'Internal Server Error'});
    }
  };

  return {
    createUser,
    getUserByEmail,
    getUserByToken,
    updateUser,
    deleteUser,
    getAllUsers,
  };

}
module.exports = { UserController };