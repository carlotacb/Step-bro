const express = require('express');
const router = express.Router();

const {UserController} = require('./controllers/userController');
const {AuthController} = require('./controllers/authController');
const {LeagueController} = require('./controllers/leagueController');
const {UserLeagueController} = require('./controllers/userLeaguesController');
const {StatusController} = require('./controllers/statusController');

const userController = UserController();
const authController = AuthController();
const leagueController = LeagueController();
const userLeagueController = UserLeagueController();
const statusController = StatusController();

// Auth routes
router.post('/login', authController.login);
router.post('/register', authController.register);

router.get('/profile', userController.getUserByToken);
router.get('/myLeagues', userController.getMyLeagues)

router.get('/users/:email', userController.getUserByEmail);
router.put('/users/:email', userController.updateUser);
router.delete('/users/:email', userController.deleteUser);

router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);

// Leagues routes
router.get('/leagues', leagueController.getAll);
router.post('/leagues', leagueController.createLeague);
router.get('/leagues/:creator_mail&:league_name', leagueController.getLeagueById);
router.put('/leagues/:creator_mail&:league_name', leagueController.updateLeague);
router.delete('/leagues/:creator_mail&:league_name', leagueController.deleteLeague);

// UserLeagues routes
router.post('/userleague', userLeagueController.joinLeague);
router.delete('/userleague', userLeagueController.leaveLeague);

// stats routes
router.get('/stats/day', statusController.getStatsDay);
router.get('/stats/week', statusController.getStatsDay);
router.post('/stats', statusController.updateStatsDay);


module.exports = router;
