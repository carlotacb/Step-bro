
const db = require("../db.js");

const LeagueController = () => {
    /*
        create table leagues (
            league_id serial unique,
            league_name varchar(50) not null,
            creation_date timestamp default current_timestamp,
            lastupdate_date timestamp default current_timestamp,
            start_date timestamp not null,
            end_date timestamp not null,
            description varchar(250),
            icon varchar(500),
            creator_mail varchar(250) not null,
            PRIMARY KEY (league_name, creator_mail),
            foreign key (creator_mail) references users (user_mail)	
        )       
    */

    const createLeague = async (req, res) => {
        const creator_mail = req.get('token');
        const league_name = req.body.league_name;
        const start_date = req.body.start_date;
        const end_date = req.body.end_date;
        const description = req.body.description;
        const icon = req.body.icon;
        try {
            const result = await db.query('INSERT INTO leagues (league_name, start_date, end_date, description, icon, creator_mail) VALUES ($1, $2, $3, $4, $5, $6)', [league_name, start_date, end_date, description, icon, creator_mail]);
            return res.status(201).send(result.rows[0]);
        } catch (err) {
            console.error(err);
            return res.status(500).json({success:false, message:'Internal Server Error'});
        }
    }

    const getLeagueById = async (req, res) => {
        const creator_mail = req.get('token');
        const league_name = req.params.league_name;
        try {
            const result = await db.query('SELECT * FROM leagues WHERE creator_mail=$1 AND league_name=$2', [creator_mail, league_name]);
            if (result.rows.length > 0) {
                return res.status(200).json(result.rows[0]);
            } else {
                return res.status(404).send('League not found');
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({success:false, message:'Internal Server Error'});
        }
    }

    const getAll = async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM leagues');
            return res.send(result.rows);
        } catch (err) {
            console.error(err);
            return res.status(500).json({success:false, message:'Internal Server Error'});
        }
    }

    const updateLeague = async (req, res) => {
        const league_name = req.params.league_name;
        const creator_mail = req.get('token');
        let originalLeague;
        try {
            const leagueResponse = await db.query('SELECT * FROM leagues WHERE creator_mail=$1 AND league_name=$2', [creator_mail, league_name]);
            if (leagueResponse.rows.length === 0) {
                return res.status(404).send('League not found');
            }
            else {
                originalLeague = leagueResponse;
            }
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({success:false, message:'Internal Server Error'});
        }
        const start_date = req.body.start_date ?? originalLeague.rows[0].start_date;
        const end_date = req.body.end_date ?? originalLeague.rows[0].end_date;
        const description = req.body.description ?? originalLeague.rows[0].description;
        const icon = req.body.icon ?? originalLeague.rows[0].icon;
        try {
            const result = await db.query('UPDATE leagues SET start_date=$1, end_date=$2, description=$3, icon=$4 WHERE creator_mail=$5 AND league_name=$6', [start_date, end_date, description, icon, creator_mail, league_name]);
            return res.status(200).json(result.rows[0]);
        } catch (err) {
            console.error(err);
            return res.status(500).json({success:false, message:'Internal Server Error'});
        }
    }

    const deleteLeague = async (req, res) => {
        const league_name = req.params.league_name;
        const creator_mail = req.get('token');
        try {
            await db.query('DELETE FROM leagues WHERE creator_mail=$1 AND league_name=$2', [creator_mail, league_name]);
            return res.status(204).send('League deleted');
        } catch (err) {
            console.error(err);
            return res.status(500).json({success:false, message:'Internal Server Error'});
        }
    }

    return {
        createLeague,
        getLeagueById,
        getAll,
        updateLeague,
        deleteLeague
    };

}

module.exports = { LeagueController };