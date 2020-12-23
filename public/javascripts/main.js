function addTask(){
    const newTask = document.getElementById("task").value;
    if(newTask !== ''){
        $.post("/todo",{
            task: newTask
        },
        function(data, _status){
            updateTodoList(data);
            document.getElementById("task").value = '';
        })
    }
}

function updateTodoList(tasks){
    var list = document.createElement('div');
    list.setAttribute("id", "tasks");

    for (const task of tasks) {
        // Create the list item:
        var item = document.createElement('p');

        var checkbox = document.createElement('input');
        checkbox.setAttribute("value", task.id);
        checkbox.setAttribute("id", task.id);
        checkbox.setAttribute("type", "checkbox");
        item.appendChild(checkbox);

        var label = document.createElement('label');
        label.setAttribute("for", task.id);
        label.innerHTML = task.task;

        item.appendChild(label);

        var divider = document.createElement('hr');
        item.appendChild(divider);

        // Add it to the list:
        list.appendChild(item);
    }

    if(document.getElementById('tasks')){
        document.getElementById('tasks').remove();
    }
    document.getElementById('task-list').appendChild(list);
}

function loadTasks(){
    $.get("/todo?id=" + window.localStorage.getItem("userId"),
     function(data, status){
        updateTodoList(data);
    })
}

function completeSelectedTasks(){
    var tasks = Array.from(document.getElementById("tasks").children);
    tasks.forEach(task => {
        const checkbox = Array.from(task.getElementsByTagName("input"))[0];
        if(checkbox.checked === true){
            $.ajax({
                url: '/todo/' + checkbox.value,
                type: 'PATCH',
                success: () => {
                    removeCompletedTaskFromList(checkbox.value);
                },
                error: () => {
                    alert("Error while completing a task");
                }
            })
        }
    })
}

function removeCompletedTaskFromList(taskId){
    var completedTask = document.getElementById(taskId);
    completedTask.parentElement.remove();
}

window.onload = function() {
    loadTasks();
}
