angular.module('angularjsnodejs', []);

angular.module('angularjsnodejs').controller('mainController', mainController);

function mainController($scope, $http) {
    $scope.formData = {};

    // Cuando se cargue la página, pide del API tareas las tareas
    $http.get('/api/tareas')
        .then(function (data) {
            $scope.tareas = data.data;
            console.log(data)
        }, function (data) {
            console.log('Error: ' + data);
        });

    // Cuando se añade un nueva TAREA, manda el texto a la API
    $scope.createTarea = function () {
        $http.post('/api/tareas', $scope.formData)
            .then(function (data) {
                $scope.formData = {};
                $scope.tareas.push(data.data);
                console.log(data);
            }, function (data) {
                console.log('Error:' + data);
            });
    };

    // Borra una TAREA despues de checkearlo como acabado
    $scope.deleteTarea = function (id) {
        $http.delete('/api/tareas/' + id)
            .then(function (data) {
                $scope.tareas = data.data;
                console.log(data);
            }, function (data) {
                console.log('Error:' + data);
            });
    };
}