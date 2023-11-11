const db = require("../db");

const StatusController = () => {
    const getStatsDay = async (req, res) => {
        const userMail = req.get('token');
        
        // get all steps on stats from this specific day and user   
        
        try {
            const result = await db.query('SELECT stats.steps FROM stats WHERE stats_day = CURRENT_DATE AND user_mail=$1', [userMail]);
            return res.status(200).json({ success: true, message: result.rows });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    const getStatsWeek = async (req, res) => {
        const userMail = req.get('token');

        

        // get all steps on stats from this specific day and user   
        try {
            const result = await db.query('select * from stats where user_mail=$1 and stats_day between current_date - INTERVAL \'7 days\' AND current_date;', [userMail]);
            return res.status(200).json({ success: true, message: result.rows });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    const updateStatsDay = async (req, res) => {
        const userMail = req.get('token');
        const steps = req.body.steps;

        // get day month and year
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        // check if steps on this day already exists
        try {
            const result = await db.query('SELECT * FROM stats WHERE user_mail=$1 AND EXTRACT(YEAR FROM stats_day)=$2 AND EXTRACT(MONTH FROM stats_day)=$3 AND EXTRACT(DAY FROM stats_day)=$4', [userMail, year, month, day]);
            if (result.rows.length === 0) {
                // create new entry
                try {
                    const result = await db.query('INSERT INTO stats (user_mail, steps, stats_day) VALUES($1, $2, $3);', [userMail, steps, year+'-'+month+'-'+day]);
                    return res.status(200).json({ success: true });
                } catch (err) {
                    console.error(err);
                    return res.status(400).json({ success: false, message: 'Error adding new steps entry to stats.' });
                }
            } else {
                // update steps depending pushing the entire date
                try {
                    const result = await db.query('UPDATE stats SET steps=$1 WHERE stats.user_mail=$2 AND EXTRACT(YEAR FROM stats_day)=$3 AND EXTRACT(MONTH FROM stats_day)=$4 AND EXTRACT(DAY FROM stats_day)=$5', [steps, userMail, year, month, day]);
                    return res.status(200).json({ success: true });
                } catch (err) {
                    console.error(err);
                    return res.status(400).json({ success: false, message: 'Error updating daily steps.' });
                }
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    return {
        getStatsDay,
        getStatsWeek,
        updateStatsDay,
    };
};

module.exports = { StatusController };