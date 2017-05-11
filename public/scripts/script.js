// check line 10 of index.html --> make sure 'myApp' matches
var myApp = angular.module( 'myApp', [] );

// set up a controller
myApp.controller( 'WhereMyPeeps', function( $http ){

// vriable global to this controller
var vm = this;

// array attached to controller (makes it available to DOM)
vm.records = [];

// "vm" stands for "view model"
vm.addRecord = function(){
  console.log('in addItem ng-click');
var objectToSend ={
  name: vm.nameIn,
  location: vm.locationIn
};
  console.log('adding objectToSend ->', objectToSend);

// angular post call
$http({
  method: 'POST',
  url: '/getRecords',
  data: objectToSend
}).then(function(response){
  console.log('back from server ->', response);
  vm.getRecords();
}); // end http

// empty inputs
vm.nameIn ='';
vm.locationIn ='';
// update from server
}; // end add item

vm.getRecords = function(){
  console.log('in getRecords');
  $http({
  method: 'GET',
  url: '/getRecords',
}).then( function success( response ){
  console.log('response ->', response);
  vm.records = response.data;
  console.log( vm.records );
});
};

vm.deleteRecords = function(id){
  console.log('in deleteRecords' + id);
  $http({
  method: 'DELETE',
  url: '/deleteRecords/' + id,
}).then( function ( response ){
  console.log('response ->', response);
  vm.getRecords();
  console.log( vm.getRecords );
});
};

});
