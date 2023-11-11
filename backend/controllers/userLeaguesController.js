const { json, raw} = require("express");
const db = require("../db.js");
const e = require("express");
require('dotenv').config()
const autToken = process.env.AUTHTOKEN
const auth = Buffer.from(autToken).toString("base64");


const UserLeagueController = () => {

    const inviteLeague = async (req, res) => {
        const userMail = req.get('token');
        const leagueId = req.body.league_id;
        const phoneNumber = req.body.phone_number;

        let invitedMail = await getMailByPhone(phoneNumber)

        // checks
        try {
            const userLeagueOwner = await db.query('SELECT * FROM leagues WHERE creator_mail=$1', [userMail]);
            if (userLeagueOwner.rows.length === 0) {
                return res.status(403).json({success: false, message: 'User not owns the league'})
            }

            const userLeagueExists = await db.query('SELECT * FROM usersleagues WHERE league_id=$1 AND user_mail=$2', [leagueId, invitedMail])
            if (userLeagueExists.rows.length !== 0) {
                return res.status(409).json({success: false, message: 'User already in this league'});
            }

            const phoneNumberNotExists = await db.query('SELECT * FROM users WHERE phone_number=$1', [phoneNumber])
            if (phoneNumberNotExists.rows.length === 0) {
                return res.status(404).json({success: false, message: 'Phone number not found'})
            }

            const leagueResponse = await db.query('SELECT * FROM leagues WHERE league_id=$1', [leagueId]);
            if (leagueResponse.rows.length === 0) {
                return res.status(404).json({success: false, message: 'League not found'});
            }

            const userResponse = await db.query('SELECT * FROM users WHERE user_mail=$1', [userMail]);
            if (userResponse.rows.length === 0) {
                return res.status(404).json({success: false, message: 'User not found'});
            }

        }
        catch (err) {
            console.log(err)
            return res.status(500).json({success:false, message:'Internal Server Error'});
        }

        let leagueName = await getLeagueName(leagueId)
        let username = await getUsername(userMail)

        let message = 'You have been invited to ' + leagueName + ' by ' + username + '.'
        // TODO afegir el link de la view de my leagues
        await sendMessage(phoneNumber, message)

        // core functionality
        try {
            const result = await db.query('INSERT INTO usersleagues (user_mail, league_id) VALUES($1, $2);', [invitedMail, leagueId]);


            return res.status(200).json({ success: true });

        }
        catch (err) {
            console.error(err);
            return res.status(500).json({success:false, message:'Internal Server Error'});
        }
    }

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

    const getLeagueName = async (leagueId) => {
        let result = await db.query('SELECT league_name FROM leagues WHERE league_id = $1', [leagueId])
        return result.rows[0].league_name
    }

    const getUsername = async (userMail) => {
        let result = await db.query('SELECT username FROM users WHERE user_mail = $1', [userMail])
        return result.rows[0].username
    }

    const getMailByPhone = async (phoneNumber) => {
        let result = await db.query('SELECT user_mail FROM users WHERE phone_number = $1', [phoneNumber])
        return result.rows[0].user_mail
    }

    const sendMessage = async (phoneNumber, message) => {
        let data = {
            from:    "StepBro",
            to:      phoneNumber,
            message: message
        }
        data = new URLSearchParams(data);
        data = data.toString();


        await fetch("https://api.46elks.com/a1/sms", {
            method: "post",
            body: data,
            headers: {"Authorization": "Basic "  + Buffer.from('u5f50a388c5c1dcd45117cd910dc05587:17E9826F479772C0E7A1687C47DD9387').toString("base64")}
        })
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.log(err))

    }

    return {
        inviteLeague,
        leaveLeague,
        rankingOfLeague,
    };
    
}
module.exports = {UserLeagueController};


