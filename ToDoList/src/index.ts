(() => {

    enum notificationsPlataforms{
        EMAIL = 'EMAIL',
        SMS = 'SMS',
        WHATSAPP = 'WHATSAPP'
    }

    enum viewMode{
        TODO = 'TODO',
        REMINDER = 'REMINDER'
    }

    const UUID = (): string => {
        return Math.random().toString(32).substring(2, 9);
    }
    const DateFormat = {
        today(): Date{
            return new Date();
        },
        tomorrow(): Date{
            const tomorrow = this.today();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        },
        formatDate(date: Date): string{
            return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
        }
    }
    interface Task{
        id: string;
        title: string;
        description: string;
        dataCreating: Date;
        dataUpdating: Date;

        render(): string;
    }

    class ToDo implements Task{
        id: string = UUID();

        title: string = '';
        dataCreating: Date = DateFormat.today();
        dataUpdating: Date = DateFormat.today();

        description: string = ''
        done: Boolean = false

        constructor(title: string, dataCreating?: Date, description?: string, done?: boolean) {
            this.title = title;
            this.dataCreating = dataCreating || new Date();
            this.description = description || "";
            this.done = done || false;
        }
        
        render(): string {
            return  `
            ----TO DO-----
            Título: ${this.title}
            Descrição: ${this.description}
            Done: ${this.done}`
        }
    }

    class Remainder implements Task{
        id: string = UUID();
       
        title: string = '';
        dataCreating: Date = DateFormat.today();
        dataUpdating: Date = DateFormat.today();

        dataRemainder: Date = DateFormat.tomorrow();
        notifications: Array<notificationsPlataforms> = [notificationsPlataforms.EMAIL, notificationsPlataforms.SMS, notificationsPlataforms.WHATSAPP]

        description: string = ''

        constructor(description: string, dataRemainder: Date, notifications: Array<notificationsPlataforms>, title?: string, dataCreating?: Date) {
            this.title = title || "";
            this.dataCreating = dataCreating || new Date();
            this.description = description;
            this.dataRemainder = dataRemainder;
            this.notifications = notifications;
        }

        render(): string {
            return  `
            ----REMINDER-----
            Descrição: ${this.description}
            Data: ${DateFormat.formatDate(this.dataRemainder)}
            Notificação Via: ${this.notifications.join(', ')}`
        }
    }


    //Objetos
    const toDo = new ToDo('Primeira Task', new Date(), 'esse é um teste', false)
    const remainder = new Remainder('Primeira Task', new Date(), [notificationsPlataforms.EMAIL], "Esse é um teste de remainder", new Date());


    const taskView = {
        getTodo(form: HTMLFormElement): ToDo {
            const todoDescription = form.todoDescription.value;
            form.reset();
            return new ToDo(todoDescription);
          },
          getReminder(form: HTMLFormElement): Remainder {
            const reminderNotifications = [
              form.notification.value as notificationsPlataforms,
            ];
            const reminderDate = new Date(form.scheduleDate.value);
            const reminderDescription = form.reminderDescription.value;
            form.reset();
            return new Remainder(
              reminderDescription,
              reminderDate,
              reminderNotifications
            );
          },
        render(tasks: Array<Task>, mode: viewMode){
            const tasksList = document.getElementById('tasksList');

            while(tasksList?.firstChild){
                tasksList.removeChild(tasksList.firstChild);
            }

            tasks.forEach((task) => {
                const li = document.createElement('li');
                const textNode = document.createTextNode(task.render());
                li.appendChild(textNode);
                tasksList?.append(li);
            });

            const todoSet = document.getElementById('todoSet');
            const remainderSet = document.getElementById('reminderSet');

            if (mode == viewMode.TODO) {
                todoSet?.setAttribute('style', 'display: block;');
                todoSet?.removeAttribute('disabled');
                remainderSet?.setAttribute('style', 'display: none;');
                remainderSet?.setAttribute('disabled', 'true');
            } else{
                remainderSet?.setAttribute('style', 'display: block;');
                remainderSet?.removeAttribute('disabled');
                todoSet?.setAttribute('style', 'display: none;');
                todoSet?.setAttribute('disabled', 'true');
            }

        },
    };

    const TaskController = (view: typeof taskView) =>{
        const tasks: Array<Task> = [];

        let mode: viewMode = viewMode.TODO;

        const handleTaskCreate = (event: Event) => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            switch (mode as viewMode) {
              case viewMode.TODO:
                tasks.push(view.getTodo(form));
                break;
              case viewMode.REMINDER:
                tasks.push(view.getReminder(form));
                break;
            }
            view.render(tasks, mode);
          };

        const handleToglleMode = (event:Event) => {
            if(mode == viewMode.TODO){
                mode = viewMode.REMINDER;
            } else{
                mode = viewMode.TODO;
            }
            view.render(tasks, mode);
        }

        const handleEvent = (event: Event) => {
            event.preventDefault();
            view.render(tasks, mode);
        };


        document.getElementById("toggleMode")?.addEventListener("click", handleToglleMode);
        document.getElementById('taskForm')?.addEventListener('submit', handleTaskCreate);

    };

    TaskController(taskView);

})();
