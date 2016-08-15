(function(){ 

	var app = angular.module('players', ['ui.bootstrap']);	
	

	app.controller('PlayersController', ['$scope', '$http', '$modal', function($scope, $http, $modal, $modalInstance){
		var players = this;
		players.player = [];
		$http.get('/players.json').success(function(data){
			players.player = data;
		});

	} ]);
})();