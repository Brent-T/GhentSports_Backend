/**
 *	Import modules
 *	---------------------------------------
 */

	const express = require('express');
	const bodyParser = require('body-parser');
	const config = require('./config');
	const ActivityApi = require('./ActivityApi');
	const api = new ActivityApi(config.db);

/**
 *	App config
 *	---------------------------------------
 */

	const app = express();
	app.use(bodyParser.json());

	// Add headers
	app.use(function (req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Headers', 'content-type');
		next();
	});

/**
 *	Routes
 *	---------------------------------------
 */

	app.get('/activities', (req, res) => {
		api.getAllActivities()
			.then(activities => res.status(200).json(activities))
			.catch(error => res.status(500).send(error));
	});

	app.post('/activity', (req, res) => {
		const activity = {
			name : req.body.name,
			date: new Date()
		};

		api.addActivity(activity)
			.then(result => res.status(200).json(result))
			.catch(error => res.status(500).send(error));
	});

	// Dev only
	if(config.server.development) {
		app.get('/clear', (req, res) => {
			api.clearActivities()
				.then(result => res.status(200).json(result))
				.catch(error => res.status(500).send(error));
		});		
	}

/**
 *	Start server
 *	---------------------------------------
 */

	const server = app.listen(config.server.port);
