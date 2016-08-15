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
        	console.log(detail);
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