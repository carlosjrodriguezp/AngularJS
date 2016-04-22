var app = angular.module("app", ['ngRoute']);

app.config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: "main.html",
            controller: "MainController"
        });
        $routeProvider.when('/seguro/listado', {
            templateUrl: "listado.html",
            controller: "ListadoSeguroController",
            resolve: {
                seguros: ['remoteResource', '$route', function (remoteResource, $route) {
                        return remoteResource.list();
                    }]
            }
        });
        $routeProvider.when('/seguro/edit/:idSeguro', {
            templateUrl: "detalle.html",
            controller: "DetalleSeguroController",
            resolve: {
                seguro: ['remoteResource', '$route', function (remoteResource, $route) {
                        return remoteResource.get($route.current.params.idSeguro);
                    }]
            }
        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }]);

app.value("urlLogo", "./images/medical14.png");

app.run(["$rootScope", "urlLogo", function ($rootScope, urlLogo) {
        $rootScope.urlLogo = urlLogo;
    }]);

function RemoteResource($http, $q, baseUrl) {

    this.get = function (idSeguro) {
        var deferred = $q.defer();
        var promise = deferred.promise;

        $http({
            method: 'GET',
            url: '/API_Java/api/SeguroMedico/' + idSeguro
        }).success(function (data, status, headers, config) {
            deferred.resolve(data);
        }).error(function (data, status, headers, config) {
            if(status === 400){
                deferred.reject(status);
            }else{
                throw new Error("Fallo obtener los datos: "+ status +"\n"+data);
            }
            
        });

        return promise;
    };
    
//    this.edit = function(){
//        var deferred = $q.defer();
//        var promise = deferred.promise;
//        
//        $http({
//            method: 'PUT',
//            url: baseUrl + '/datos'+ idSeguro + '.jason'
//        });
//    };
    
    this.list = function () {
        var deferred = $q.defer();
        var promise = deferred.promise;

        $http({
            method: 'GET',
            url: '/API_Java/api/SeguroMedico/'
        }).success(function (data, status, headers, config) {
            deferred.resolve(data);
        }).error(function (data, status, headers, config) {
            if(status === 400){
                deferred.reject(status);                
            }else{
                throw new Error("Fallo obtener los datos: "+ status +"\n"+data);
            }
        });

        return promise;
    };
}

function RemoteResourceProvider() {
    var _baseUrl;
    this.setBaseUrl = function (baseUrl) {
        _baseUrl = baseUrl;
    };
    this.$get = ['$http', '$q', function ($http, $q, $routeParams) {
            return new RemoteResource($http, $q, _baseUrl);
        }];
}

app.provider("remoteResource", RemoteResourceProvider);

app.constant("baseUrl", "./js");
app.config(['baseUrl', 'remoteResourceProvider', function (baseUrl, remoteResourceProvider) {
        remoteResourceProvider.setBaseUrl(baseUrl);
    }]);

app.controller("MainController", ["$scope", function ($scope) {

    }]);

//app.controller("DetalleSeguroController", ['$scope', '$log', '$routeParams', 'remoteResource', function ($scope, $log, $routeParams, remoteResource) {
app.controller("DetalleSeguroController", ['$scope', '$log', 'seguro', function ($scope, $log, seguro) {
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

        //$scope.urlLogo = "./images/medical14.png"

        $scope.deshabilitarAlergia = function () {
            return $scope.seguro.enfermedades.alergia === false; //JavaScript: The good parts
        };

        $log.debug("ejecutando acciones desde AngularJS");

        $scope.seguro = seguro;

//        remoteResource.get($routeParams.idSeguro).then(function(seguro){
//            $scope.seguro = seguro;
//        },function(status){
//            alert("Fallo en llamada HTTP: "+status)
//        });

//        remoteResource.get(function (seguro) {
//            $scope.seguro = seguro;
//        }, function (data, status) {
//            alert("Fallo en llamada HTTP: " + status);
//        });

//    $http({
//        method: 'GET',
//        url: 'js/datos.json'
//    }).success(function(data, status, headers, config){
//        $scope.seguro=data;
//    }).error(function(data, status, headers, config){
//        alert("Error del servicio "+status);
//    });        

    }]);

//app.controller("ListadoSeguroController", ['$scope', 'remoteResource', function ($scope, remoteResource) {
app.controller("ListadoSeguroController", ['$scope', 'seguros', function ($scope, seguros) {
        $scope.filtro = {apellido: ""};

        $scope.seguros = seguros;

//        remoteResource.list().then(function(seguros){
//            $scope.seguros = seguros;
//        },function(status){
//            alert("Fallo en llamada HTTP: "+status);
//        });

//        remoteResource.list(function (seguros) {
//            $scope.seguros = seguros;
//        }, function (data, status) {
//            alert("Fallo en llamada HTTP: " + status);
//        })

    }]);

app.filter("miFiltro", ["$filter", function ($filter) {
        var filterFn = $filter("filter");

        function normalize(texto) {
            texto = texto.replace(/[áàäâ]/g, "a");
            texto = texto.replace(/[éèëê]/g, "e");
            texto = texto.replace(/[íìïî]/g, "i");
            texto = texto.replace(/[óòôö]/g, "o");
            texto = texto.replace(/[úùüü]/g, "u");
            texto = texto.toUpperCase();
            return texto;
        }

        function comparator(actual, expected) {
            if (normalize(actual).indexOf(normalize(expected)) >= 0) {
                return true;
            } else {
                return false;
            }
        }

        function miFiltro(array, expression) {
            return filterFn(array, expression, comparator);
        }

        return miFiltro;
    }]);

app.directive('caDatepicker', [function (dateFormat) {
        return {
            restrict: 'A',
            link: function ($scope, element, attributes) {
                element.datepicker({
                    dateFormat: attributes.caDatepicker,
                    onSelect: function () {
                        $(this).trigger('change');
                    }
                });
            }
        };
    }]);