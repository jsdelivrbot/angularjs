angular.module('angularjsnodejs', []).controller('mainController', mainController);

function mainController($scope, $http) {
    $scope.formData = {};
    $scope.tasks = [];

    $http.get('https://glacial-savannah-46887.herokuapp.com/task')
        .then(function (data) {
            $scope.tasks = data.data;
            console.log(data)
        }, function (data) {
            console.error('Error: ', data);
        });

    $scope.createTask = function () {
        $scope.formData.id = $scope.tasks.length + 1;
        $http.post('https://glacial-savannah-46887.herokuapp.com/task/create', $scope.formData)
            .then((data) => {
                $scope.formData = {};
                $scope.tasks.push(data.data);
                console.log(data);
            }, (data) => {
                console.log(`Error`, data);
            });
    };

    $scope.deleteTask = function (id) {
        $http.get(`https://glacial-savannah-46887.herokuapp.com/task/destroy/${id}`)
            .then((data) => {
                $scope.tasks = $scope.tasks.filter((task) => {
                    return task.id != id;
                });
                console.log(data);
            }, (data) => {
                console.error(`Error:`, data);
            });
    };

    $scope.taskPendding = function (task) {
        var currentDate = new Date();
        currentDate.setHours(0,0,0,0);
        return new Date(task.dueDate) >= currentDate;
    }

    $scope.taskOverdue = function (task) {
        var currentDate = new Date();
        currentDate.setHours(0,0,0,0);
        return new Date(task.dueDate) < currentDate;
    }
}