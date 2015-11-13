'use strict';

// Create app module
var app = angular.module('myApp', []);


// PeopleController.js
app.controller('myController', function ($scope, peopleService) {
    
    $scope.fields1 = { show: false};
    $scope.fields2 = { show: true};
    
    $scope.state = {
        newPersonName: '',
        newPersonOcupation: ''
    };

    $scope.addPerson = function (callback) {
        $scope.people.push({
            name: $scope.state.newPersonName,
            ocupation: $scope.state.newPersonOcupation,
            id: $scope.people.length,
            update: false
        });
        callback();
    };

    $scope.clearFields = function () {
        $scope.state = {
            newPersonName: '',
            newPersonOcupation: ''
        };
    }

    $scope.deletePerson = function (person) {
        $scope.people.splice($scope.people.indexOf(person), 1);
    };

    $scope.updatePerson = function (person) {

        // $scope.fields1.show = !$scope.fields1.show;
        // $scope.fields2.show = !$scope.fields2.show;
        person.update = !person.update;
    };

    peopleService.getPeople().then(function (result) {
        // Success!
        console.log('Success!');
        $scope.people = result;
    }, function (reason) {
        // Disaster!
        console.error(reason);
    }).then(function () {
        if ($scope.people.length > 0) {
            peopleService.personDetails($scope.people[0].id).then(function (result) {
                $scope.people[0].details = result;
            });
        }
    });

});

// PeopleService.js
app.service('peopleService', function ($q) {

    this.getPeople = function () {
        var deferred = $q.defer();

        setTimeout(function () {
            deferred.resolve([
                {name: 'Carlos', ocupation: 'Developer', id: 0, update: false}
            ]);
        }, Math.floor(Math.random() * 1));

//          setTimeout(function () {
//            deferred.reject('The World Collapsed! Error: 42');
//          }, Math.floor(Math.random()*5000));

        return deferred.promise;

        // return [
        //      {name: 'CarlosSincrono', ocupation: 'Developer'}
        // ];
    };

    this.personDetails = function (id) {
        var deferred = $q.defer();

        setTimeout(function () {
            deferred.resolve(
                    {birthdate: '2000-11-11'}
            );
        }, Math.floor(Math.random() * 3000));

        setTimeout(function () {
            deferred.reject('The World Collapsed! Error: 42');
        }, Math.floor(Math.random() * 5000));

        return deferred.promise;
    }
});

