const MongoClient = require('mongodb').MongoClient;

class ActivityApi {
	constructor(config) {
		this.db_url = config.url;
		this.collectionName = 'activities';
	}

	getAllActivities() {
		return new Promise((resolve, reject) => {
			MongoClient.connect(this.db_url, (err, db) => {
				if(err) reject('Couldn\'t connect to database');
				else {
					const collection = db.collection(this.collectionName);
					collection
						.find({})
						.sort('date', -1)
						.toArray()
							.then(activities => resolve(activities))
							.catch(error => reject('Couldn\'t find activities'));
				}
				db.close();
			});
		});
	}

	addActivity(activity) {
		return new Promise((resolve, reject) => {
			MongoClient.connect(this.db_url, (err, db) => {
				if(err) reject('Couldn\'t connect to database');
				else {
					const collection = db.collection(this.collectionName);
					collection.insertOne(activity)
						.then(result => resolve('Activity was added'))
						.catch(error => reject('Couldn\'t insert activity'));
				}
				db.close();
			});
		});
	}

	clearActivities() {
		return new Promise((resolve, reject) => {
			MongoClient.connect(this.db_url, (err, db) => {
				if(err) reject('Couldn\'t connect to database');
				else {
					const collection = db.collection(this.collectionName);
					collection.deleteMany({})
						.then(result => resolve('Activities cleared'))
						.catch(error => reject('Couldn\'t clear activities'));
				}
				db.close();
			});
		});
	}
}

module.exports = ActivityApi;
