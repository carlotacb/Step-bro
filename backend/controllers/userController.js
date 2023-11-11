const UserController = () => {
    const createUser = async (req, res) => {
        const email = req.body.email;
        const username = req.body.username;
        const userPwd = req.body.password;
        const phone = req.body.phone;
        const bio = req.body.bio;
        const icon = req.body.icon;
        try {
          const result = await pool.query('INSERT INTO users (email, username, passwd, phone, bio, icon) VALUES ($1, $2, $3, $4, $5, $6)', [email, username, userPwd, phone, bio, icon]);
          return res.status(201).send(result.rows[0]);
        } catch (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }
    };

    const getUserById = async (req, res) => {
        const userId = req.params.id;
        try {
          const result = await pool.query('SELECT * FROM users WHERE users.id=$1', [userId]);
          if(result.rows.length > 0){
            return res.status.json();
      
          // } else {
          
          }
        } catch (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }
      
    };


    const getAllUsers = async (req, res) => {
      try {
        const result = await pool.query('SELECT * FROM users');
        return res.send(result.rows);

      } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
    };

    return {
        createUser,
        getUserById,
        getAllUsers,
    };
    
  }
module.exports = {UserController};