var app = angular.module("myApp",[]);
app.controller("contactController",function($scope , $http){
	var refresh = function(){	
		$http.get('/contacts').success(function(response){
			console.log("request handled");
			$scope.contacts = response;
			$scope.contactClear();

		});
	};

	refresh();

	$scope.addContact = function(){
		
		$http({
			url : '/contacts',
			method : 'POST',
			data : $scope.contact
		}).success(function(response){
			console.log("added the contact");
			refresh();
		});
     };

     $scope.delete = function(id){
     	$http.delete('/contacts/' + id).success(function(response){
 		refresh();
     	});
     };

     $scope.modify = function(contactObj){
     	console.log(contactObj);
     	$scope.contact = contactObj;
     };

     $scope.update=function(){
     	console.log($scope.contact);
     	$http.put('/contacts/' + $scope.contact._id, $scope.contact).success(function(response){
     		refresh();
     	});
     };

     $scope.contactClear = function(){
     	$scope.contact = { };
     };

 });