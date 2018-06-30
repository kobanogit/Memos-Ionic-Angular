angular.module('memos')

.controller('ShoppingCtrl', function($scope, $http) {
  var url = 'https://shopping-f19d0.firebaseio.com/items.json';
  $scope.items = getItems();

  $scope.addItem = function() {
    var name = prompt("Que devez-vous acheter?");
    if (name) {
      var postData = {
        "name": name
      };
      $http.post(url, postData).success(function(data) {
        $scope.items = getItems();
      });
    }
  };

  function getItems() {
    var items = [];
    $http.get(url).success(function(data) {
      // console.log('GET url : ' + url)
      angular.forEach(data, function(value, key) {
        var name = {
          name: value.name,
          key : key
        };
          items.push(name);
      });
    });
    return items;
  };

  $scope.removeItem = function (item){
    // console.log('item : ' + item);
    if (confirm("Supprimer : " + item.name) == true) {
      $http.delete('https://shopping-f19d0.firebaseio.com/items/'+item.key+'.json')
      .success(function(data, status, headers){
        // console.log('deleted');
        $scope.items = getItems();
      });
    } else {

    }

  };

  $scope.editItem = function (item){
    console.log('item.key : ' + item.key + ' - value : ' + item.name);
    var editedName = prompt(item.name,item.name);
    if (editedName) {
      var postData = {
        name : editedName
      };
      $http.put('https://shopping-f19d0.firebaseio.com/items/'+item.key+'.json', postData).success(function(data) {
        $scope.items = getItems();
      });
    };
  };


});
