var app = angular.module("app",[]);

app.controller("SeguroController", ['$scope',function ($scope){
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
}]);
