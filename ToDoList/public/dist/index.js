"use strict";
(function () {
    var notificationsPlataforms;
    (function (notificationsPlataforms) {
        notificationsPlataforms["EMAIL"] = "EMAIL";
        notificationsPlataforms["SMS"] = "SMS";
        notificationsPlataforms["WHATSAPP"] = "WHATSAPP";
    })(notificationsPlataforms || (notificationsPlataforms = {}));
    var viewMode;
    (function (viewMode) {
        viewMode["TODO"] = "TODO";
        viewMode["REMINDER"] = "REMINDER";
    })(viewMode || (viewMode = {}));
    var UUID = function () {
        return Math.random().toString(32).substring(2, 9);
    };
    var DateFormat = {
        today: function () {
            return new Date();
        },
        tomorrow: function () {
            var tomorrow = this.today();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        },
        formatDate: function (date) {
            return "".concat(date.getDate(), ".").concat(date.getMonth() + 1, ".").concat(date.getFullYear());
        }
    };
    var ToDo = /** @class */ (function () {
        function ToDo(title, dataCreating, description, done) {
            this.id = UUID();
            this.title = '';
            this.dataCreating = DateFormat.today();
            this.dataUpdating = DateFormat.today();
            this.description = '';
            this.done = false;
            this.title = title;
            this.dataCreating = dataCreating || new Date();
            this.description = description || "";
            this.done = done || false;
        }
        ToDo.prototype.render = function () {
            return "\n            ----TO DO-----\n            T\u00EDtulo: ".concat(this.title, "\n            Descri\u00E7\u00E3o: ").concat(this.description, "\n            Done: ").concat(this.done);
        };
        return ToDo;
    }());
    var Remainder = /** @class */ (function () {
        function Remainder(description, dataRemainder, notifications, title, dataCreating) {
            this.id = UUID();
            this.title = '';
            this.dataCreating = DateFormat.today();
            this.dataUpdating = DateFormat.today();
            this.dataRemainder = DateFormat.tomorrow();
            this.notifications = [notificationsPlataforms.EMAIL, notificationsPlataforms.SMS, notificationsPlataforms.WHATSAPP];
            this.description = '';
            this.title = title || "";
            this.dataCreating = dataCreating || new Date();
            this.description = description;
            this.dataRemainder = dataRemainder;
            this.notifications = notifications;
        }
        Remainder.prototype.render = function () {
            return "\n            ----REMINDER-----\n            Descri\u00E7\u00E3o: ".concat(this.description, "\n            Data: ").concat(DateFormat.formatDate(this.dataRemainder), "\n            Notifica\u00E7\u00E3o Via: ").concat(this.notifications.join(', '));
        };
        return Remainder;
    }());
    //Objetos
    var toDo = new ToDo('Primeira Task', new Date(), 'esse é um teste', false);
    var remainder = new Remainder('Primeira Task', new Date(), [notificationsPlataforms.EMAIL], "Esse é um teste de remainder", new Date());
    var taskView = {
        getTodo: function (form) {
            var todoDescription = form.todoDescription.value;
            form.reset();
            return new ToDo(todoDescription);
        },
        getReminder: function (form) {
            var reminderNotifications = [
                form.notification.value,
            ];
            var reminderDate = new Date(form.scheduleDate.value);
            var reminderDescription = form.reminderDescription.value;
            form.reset();
            return new Remainder(reminderDescription, reminderDate, reminderNotifications);
        },
        render: function (tasks, mode) {
            var tasksList = document.getElementById('tasksList');
            while (tasksList === null || tasksList === void 0 ? void 0 : tasksList.firstChild) {
                tasksList.removeChild(tasksList.firstChild);
            }
            tasks.forEach(function (task) {
                var li = document.createElement('li');
                var textNode = document.createTextNode(task.render());
                li.appendChild(textNode);
                tasksList === null || tasksList === void 0 ? void 0 : tasksList.append(li);
            });
            var todoSet = document.getElementById('todoSet');
            var remainderSet = document.getElementById('reminderSet');
            if (mode == viewMode.TODO) {
                todoSet === null || todoSet === void 0 ? void 0 : todoSet.setAttribute('style', 'display: block;');
                todoSet === null || todoSet === void 0 ? void 0 : todoSet.removeAttribute('disabled');
                remainderSet === null || remainderSet === void 0 ? void 0 : remainderSet.setAttribute('style', 'display: none;');
                remainderSet === null || remainderSet === void 0 ? void 0 : remainderSet.setAttribute('disabled', 'true');
            }
            else {
                remainderSet === null || remainderSet === void 0 ? void 0 : remainderSet.setAttribute('style', 'display: block;');
                remainderSet === null || remainderSet === void 0 ? void 0 : remainderSet.removeAttribute('disabled');
                todoSet === null || todoSet === void 0 ? void 0 : todoSet.setAttribute('style', 'display: none;');
                todoSet === null || todoSet === void 0 ? void 0 : todoSet.setAttribute('disabled', 'true');
            }
        },
    };
    var TaskController = function (view) {
        var _a, _b;
        var tasks = [];
        var mode = viewMode.TODO;
        var handleTaskCreate = function (event) {
            event.preventDefault();
            var form = event.target;
            switch (mode) {
                case viewMode.TODO:
                    tasks.push(view.getTodo(form));
                    break;
                case viewMode.REMINDER:
                    tasks.push(view.getReminder(form));
                    break;
            }
            view.render(tasks, mode);
        };
        var handleToglleMode = function (event) {
            if (mode == viewMode.TODO) {
                mode = viewMode.REMINDER;
            }
            else {
                mode = viewMode.TODO;
            }
            view.render(tasks, mode);
        };
        var handleEvent = function (event) {
            event.preventDefault();
            view.render(tasks, mode);
        };
        (_a = document.getElementById("toggleMode")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", handleToglleMode);
        (_b = document.getElementById('taskForm')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', handleTaskCreate);
    };
    TaskController(taskView);
})();
