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

    const rankingOfLeague = async (req, res) => {
        // get league name from url params  
        const leagueId = req.params.league_id;

        // check if league exists
        try {//TODO FIX THIS QUERY
            const leagueResponse = await db.query('SELECT * FROM leagues WHERE league_id=$1', [leagueId]);
            if (leagueResponse.rows.length === 0) {
                return res.status(404).json({success:false, message:'League not found'});
            }
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({success:false, message:'Failed checking if league exists'});
        }

        // get all users in league but in order of steps descending
        try {
            const result = await db.query('SELECT users.username, stats.steps FROM stats INNER JOIN users ON stats.user_mail=users.user_mail WHERE stats.league_id=$1 ORDER BY stats.steps DESC', [leagueId]);
            return res.status(200).json({ success: true, message: result.rows });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Failed retrieving the ranking' });
        }
    }
    return {
        joinLeague,
        leaveLeague,
        rankingOfLeague
    };
    
}
module.exports = {UserLeagueController};


