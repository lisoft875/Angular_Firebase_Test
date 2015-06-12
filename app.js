'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp',['firebase']);

myApp.controller('GuerraCtrl', ['$scope', 'GuerraSrv',function($scope, GuerraSrv) {
    $scope.ticosLocos = GuerraSrv.lista;
    $scope.oponent = GuerraSrv.oponente;
    $scope.changedValue = function(argEvent){
        var changeValue = GuerraSrv.listaRef.child(this.jugador.$id);
        var itemName = argEvent.name;
        var itemValue = argEvent.value;
        if(itemName == "ticoLoco"){
            changeValue.update({
                "ticoLoco":itemValue
            });
            return;
        }
        if(itemName == "posicionReasignado"){
            changeValue.update({
                "posicionReasignado":itemValue
            });
            return;
        }
        if(itemName == "comentario"){
            changeValue.update({
                "comentario":itemValue
            });
            return;
        }
        var oponente = GuerraSrv.oponenteRef.child(0);
        if(itemName == "nombre"){

        }
    }
    $scope.reset = function(){
        for(var i = 0; i < GuerraSrv.lista.length; i++){
            var changeValue = GuerraSrv.listaRef.child(i);
            changeValue.update({
                "comentario":"",
                "posicionReasignado":""
            })
        }
    }

}]);

myApp.factory('GuerraSrv', ['$firebase', function($firebase) {
    var data = {};
    data.listaRef = new Firebase("https://gticoslocos.firebaseio.com/guerra");
    data.listaSync = $firebase(data.listaRef);
    data.lista = data.listaSync.$asArray();

    return data;
}]);