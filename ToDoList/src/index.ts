(() => {
    const toDo = {description: 'todo', done: false,};
    const remainder = {description: 'remainder', date: '01.01.2024',};

    const taskView = {
        render(tasks: Array<Object>){
            const tasksList = document.getElementById('tasksList');

            while(tasksList?.firstChild){
                tasksList.removeChild(tasksList.firstChild);
            }

            tasks.forEach((task) => {
                const li = document.createElement('li');
                const textNode = document.createTextNode(JSON.stringify(task));
                li.appendChild(textNode);
                tasksList?.append(li);
            });
        },
    };

    const TaskController = (view: typeof taskView) =>{
        const tasks: Array<Object> = [toDo, remainder];

        const handleEvent = (event: Event) => {
            event.preventDefault();
            view.render(tasks);
        };

        document.getElementById('taskForm')?.addEventListener('submit', handleEvent);

    };

    TaskController(taskView);

})();
