var data = require('../data/friends.js');

module.exports = function (app) {

	app.get('/api/friends', function(req, res){
		res.json(data);
	})

	app.post('/api/friends', function(req, res){
		var check = req.body;
		//Make sure the values are valid ints
		for(var i = 0; i < check.scores.length; i++) {
			var number = parseInt(check.scores[i]);
			
			if(number >= 1 && number <= 5){
				check.scores[i] = number
			}
		}

		var differences = [];

		for(var i = 0; i < data.length; i++) {

			var possibleMatch = data[i];
			var totalDifference = 0;
			
			for(var i = 0; i < possibleMatch.scores.length; i++) {
				var difference = Math.abs(possibleMatch.scores[i] - check.scores[i]);
				totalDifference += difference;
			}

			differences[i] = totalDifference;
		}

		var bestFriendNum = differences[0];
		var bestFriendIndex = 0;

		for(var i = 1; i < differences.length; i++) {
			if(differences[i] < bestFriendNum) {
				bestFriendNum = differences[i];
				bestFriendIndex = i;
			}
		}

		data.push(check);

		res.json(data[bestFriendIndex]);
	})
}