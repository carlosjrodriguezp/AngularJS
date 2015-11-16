var app = angular.module("app", []);

function RemoteResource($http, baseUrl) {
    this.get = function (fnOk, fnError) {
        $http({
            method: 'GET',
            url: baseUrl + '/datos.json'
        }).success(function (data, status, headers, config) {
            fnOk(data);
        }
        ).error(function (data, status, headers, config) {
            fnError(data, status);
        });
    }
}

function RemoteResourceProvider() {
    var _baseUrl;
    this.setBaseUrl = function (baseUrl) {
        _baseUrl = baseUrl;
    };
    this.$get = ['$http', function ($http) {
            return new RemoteResource($http, _baseUrl);
        }];
}

app.provider("remoteResource", RemoteResourceProvider);

app.constant("baseUrl", "./js");
app.config(['baseUrl', 'remoteResourceProvider', function (baseUrl, remoteResourceProvider) {
        remoteResourceProvider.setBaseUrl(baseUrl);
    }]);

app.controller("SeguroController", ['$scope', '$log', 'remoteResource', function ($scope, $log, remoteResource) {
        $scope.seguro = {
            nif: "",
            nombre: "",
            apellido: "",
            edad: undefined,
            sexo: "",
            edoCivil: false,
            numHijos: undefined,
            embarazada: false,
            cobertura: {
                oftalmologia: false,
                dental: false,
                fecundaInvitro: false
            },
            enfermedades: {
                corazon: false,
                estomacal: false,
                rinon: false,
                alergia: false,
                nomAlergia: ""
            },
            fechaCrea: new Date()
        };

        $scope.sexos = [{
                codSex: "F",
                descripcion: "Femenino"
            },
            {
                codSex: "M",
                descripcion: "Masculino"
            }];
        
        $scope.urlLogo = "./images/medical14.png"

        $scope.deshabilitarAlergia = function () {
            return $scope.seguro.enfermedades.alergia === false; //JavaScript: The good parts
        };

        $log.debug("ejecutando acciones desde AngularJS");

        remoteResource.get(function (seguro) {
            $scope.seguro = seguro;
        }, function (data, status) {
            alert("Fallo en llamada HTTP: " + status);
        });

//    $http({
//        method: 'GET',
//        url: 'js/datos.json'
//    }).success(function(data, status, headers, config){
//        $scope.seguro=data;
//    }).error(function(data, status, headers, config){
//        alert("Error del servicio "+status);
//    });        

    }]);



