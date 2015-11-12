var app = angular.module("app",[]);

function PruebaController($scope){
    $scope.mensaje = "prueba angular";
    
    $scope.cambioMensaje = function() {
        $scope.mensaje = "nuevo mensaje";
    };
};

function SeguroController($scope){
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
}