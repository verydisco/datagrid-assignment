(function(){ 

	var app = angular.module('players', ['ui.bootstrap']);	
	

	app.controller('PlayersController', ['$scope', '$http', '$modal', function($scope, $http, $modal, $modalInstance){
		var players = this;
		players.player = [];
		$http.get('/players.json').success(function(data){
			players.player = data;
		});

		//sort function used in thead
		$scope.sortBy = function(propertyName) {
			$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
			$scope.propertyName = propertyName;
		};

		this.newplayer = {};

		//add new player, pushs to the bottom of the table
		this.addNewPlayer = function(player){
			$scope.players.player.push(this.newplayer);
			this.newplayer = {};	
			$scope.modalInstance.close();	
		};

		//update player, not using ng model to ensure user confirms changes. Due to this I am using the hashkey to find orig
		this.updatePlayer = function(){
			var index =  $scope.players.player.map(function(d) { return d['$$hashKey']; }).indexOf($scope.selectedPlayerKey);
			$scope.players.player[index] = $scope.selectedPlayer;
			
			$scope.modalInstance.close();	

		};


		//show the add form pop up
		$scope.showAddForm = function () {
            $scope.modalInstance = $modal.open({
                templateUrl: '/modal-form.html',
                controller: ModalInstanceCtrl,
                scope: $scope,
                resolve: {
                    userForm: function () {
                        return $scope.userForm;
                    }
                }
            });
        };

        //show the edit form pop up, this passes the detail on the clicked user
        $scope.showEditForm = function (detail) {
            $scope.selectedPlayer = angular.copy(detail);
            $scope.selectedPlayerKey = detail['$$hashKey'];
            $scope.modalInstance = $modal.open({
                
                templateUrl: '/modal-editform.html',
                controller: ModalInstanceCtrl,
                scope: $scope,
                resolve: {
                    userForm: function () {
                        return $scope.userForm;
                    }
                }
            });
        };


	} ]);

	//modal instance used to close the modal view
	var ModalInstanceCtrl = function ($scope, $modalInstance) {
	    $scope.cancel = function () {
	        $modalInstance.dismiss('cancel');
	    };
	};

})();