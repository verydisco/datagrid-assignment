(function(){ 

	var app = angular.module('players', ['ui.bootstrap']);	
	

	app.controller('PlayersController', ['$scope', '$http', '$modal', function($scope, $http, $modal, $modalInstance){
		var players = this;
		players.player = [];
		$http.get('/players.json').success(function(data){
			players.player = data;
		});

		$scope.sortBy = function(propertyName) {
			$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
			$scope.propertyName = propertyName;
		};

		this.newplayer = {};

		this.addNewPlayer = function(player){
			$scope.players.player.push(this.newplayer);
			this.newplayer = {};	
			$scope.modalInstance.close();	
		};

		this.updatePlayer = function(){
			var index =  $scope.players.player.map(function(d) { return d['$$hashKey']; }).indexOf($scope.selectedPlayerKey);
			$scope.players.player[index] = $scope.selectedPlayer;
			
			$scope.modalInstance.close();	

		};



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

	var ModalInstanceCtrl = function ($scope, $modalInstance) {
	    $scope.cancel = function () {
	        $modalInstance.dismiss('cancel');
	    };
	};

})();