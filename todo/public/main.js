angular.module('angularjsnodejs', []).controller('mainController', mainController);

function mainController($scope, $http) {
    var vm = this;

    vm.formData = {};
    vm.tasks = [];

    vm.currentDate = new Date();
    vm.currentDate.setHours(0, 0, 0, 0);

    $http.get('https://glacial-savannah-46887.herokuapp.com/task')
        .then(function (data) {
            vm.tasks = data.data;
            console.log(data)
        }, function (data) {
            console.error('Error: ', data);
        });

    vm.createTask = function () {
        vm.formData.id = vm.tasks.length + 1;
        $http.post('https://glacial-savannah-46887.herokuapp.com/task/create', vm.formData)
            .then((data) => {
                vm.formData = {};
                vm.tasks.push(data.data);
                console.log(data);
            }, (data) => {
                console.log(`Error`, data);
            });
    };

    vm.deleteTask = function (id) {
        $http.get(`https://glacial-savannah-46887.herokuapp.com/task/destroy/${id}`)
            .then((data) => {
                vm.tasks = vm.tasks.filter((task) => {
                    return task.id != id;
                });
                console.log(data);
            }, (data) => {
                console.error(`Error:`, data);
            });
    };

    vm.taskPendding = function (task) {
        return new Date(task.dueDate) >= vm.currentDate;
    }

    vm.taskOverdue = function (task) {
        return new Date(task.dueDate) < vm.currentDate;
    }
}