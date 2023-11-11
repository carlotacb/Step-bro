const db = require("../db.js");

const UserController = () => {

  const createUser = async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const userPwd = req.body.password;
    const phone = req.body.phone;
    const bio = req.body.bio;
    const icon = req.body.icon;
    try {
      const result = await db.query('INSERT INTO users(user_mail, phone_number, username, passwd, bio, icon) VALUES($1, $2, $3, $4, $5, $6);', [email, phone, username, userPwd, bio, icon]);
      return res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
  };

  const getUserByEmail = async (req, res) => {
    const userEmail = req.params.email;
    try {
      const result = await db.query('SELECT user_mail,phone_number,username,bio,icon,creation_date,lastupdate_date FROM users WHERE users.user_mail=$1', [userEmail]);
      if (result.rows.length > 0) {
        return res.status(200).json({ success: true, message: result.rows[0] });
      } else {
        return res.status(404).json({ success: false, message: 'Not Found' });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

  };


  const getAllUsers = async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM users');
      return res.send(result.rows);

    } catch (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
  };

  return {
    createUser,
    getUserByEmail,
    getAllUsers,
  };

}
module.exports = { UserController };