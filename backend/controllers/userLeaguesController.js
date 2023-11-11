const { json } = require("express");
const db = require("../db.js");
const UserLeagueController = () => {


    const joinLeague = async (req, res) => {
        const userMail = req.get('token');
        const leagueId = req.body.league_id;
        
        // check if user and league exist
        try {
            const leagueResponse = await db.query('SELECT * FROM leagues WHERE league_id=$1', [leagueId]);
            if (leagueResponse.rows.length === 0) {
                return res.status(404).json({success:false, message:'League not found'});
            }
            const userResponse = await db.query('SELECT * FROM users WHERE user_mail=$1', [userMail]);
            if (userResponse.rows.length === 0) {
                return res.status(404).json({success:false, message:'User not found'});
            }
            
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({success:false, message:'Internal Server Error'});
        }

        // main core functionality
        try {
            const result = await db.query('INSERT INTO usersleagues (user_mail, league_id) VALUES($1, $2);', [userMail, leagueId]);
            return res.status(200).json({ success: true });
        } catch (err) {
            console.error(err);
            return res.status(500).json({success:false, message:'Internal Server Error'});
        }
    };
    const leaveLeague = async (req, res) => {
        const userMail = req.get('token');
        const leagueId = req.body.league_id;

        // check if user and league exist and is in league
        try {
            const leagueResponse = await db.query('SELECT * FROM leagues WHERE league_id=$1', [leagueId]);
            if (leagueResponse.rows.length === 0) {
                return res.status(404).json({success:false, message:'League not found'});
            }
            const userResponse = await db.query('SELECT * FROM users WHERE user_mail=$1', [userMail]);
            if (userResponse.rows.length === 0) {
                return res.status(404).json({success:false, message:'User not found'});
            }
            const ownResponse = await db.query('SELECT * FROM usersleagues WHERE user_mail=$1 AND league_id=$2', [userMail, leagueId]);
            if (ownResponse.rows.length === 0) {
                return res.status(403).json({success:false, message:'You are not in this league'});
            }
            
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({success:false, message:'Internal Server Error'});
        }
        // do core functionality
        try {   
            const result = await db.query('DELETE FROM usersleagues WHERE user_mail = $1 AND league_id = $2;', [userMail, leagueId]);
            return res.status(200).json({ success: true });
        } catch (err) {
            console.error(err);
            return res.status(500).json('Internal Server Error');
        }

    };
    return {
        joinLeague,
        leaveLeague,
    };
    
}
module.exports = {UserLeagueController};


