var app = angular.module("app",[]);

app.controller("SeguroController", ['$scope','$log','$http',function ($scope,$log,$http){
    $scope.seguro = {
        nif:"",
        nombre:"",
        apellido:"",
        edad:undefined,
        sexo:"",
        edoCivil:false,
        numHijos:undefined,
        embarazada:false,
        cobertura:{
            oftalmologia:false,
            dental:false,
            fecundaInvitro:false
        },
        enfermedades:{
            corazon:false,
            estomacal:false,
            rinon:false,
            alergia:false,
            nomAlergia:""
        },
        fechaCrea:new Date()
    };
    
    $scope.deshabilitarAlergia = function() {
        return $scope.seguro.enfermedades.alergia===false; //JavaScript: The good parts
    };
    
    $log.debug("ejecutando acciones desde AngularJS");
    
    $http({
        method: 'GET',
        url: 'js/datos.json'
    }).success(function(data, status, headers, config){
        $scope.seguro=data;
    }).error(function(data, status, headers, config){
        alert("Error del servicio "+status);
    });
    
}]);
