"use strict";
(function () {
    var toDo = { description: 'todo', done: false, };
    var remainder = { description: 'remainder', date: '01.01.2024', };
    var taskView = {
        render: function (tasks) {
            var tasksList = document.getElementById('tasksList');
            while (tasksList === null || tasksList === void 0 ? void 0 : tasksList.firstChild) {
                tasksList.removeChild(tasksList.firstChild);
            }
            tasks.forEach(function (task) {
                var li = document.createElement('li');
                var textNode = document.createTextNode(JSON.stringify(task));
                li.appendChild(textNode);
                tasksList === null || tasksList === void 0 ? void 0 : tasksList.append(li);
            });
        },
    };
    var TaskController = function (view) {
        var _a;
        var tasks = [toDo, remainder];
        var handleEvent = function (event) {
            event.preventDefault();
            view.render(tasks);
        };
        (_a = document.getElementById('taskForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', handleEvent);
    };
    TaskController(taskView);
})();
