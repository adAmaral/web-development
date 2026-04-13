const inputTask = document.querySelector('.atvinputTask');
const addTaskBtn = document.querySelector('.addTaskBtn');
const taskList = document.querySelector('.atvul');

addTaskBtn.addEventListener('click', () => {
    const taskText = inputTask.value.trim();
    if (taskText !== '') {
        const newTask = document.createElement('li');
        newTask.classList.add('atvli');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('taskCheckbox');
        
        const taskSpan = document.createElement('span');
        taskSpan.classList.add('taskText');
        taskSpan.textContent = taskText;
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'X';
        removeBtn.classList.add('removebtn');
        
        newTask.appendChild(checkbox);
        newTask.appendChild(taskSpan);
        newTask.appendChild(removeBtn);
        
        taskList.appendChild(newTask);
        inputTask.value = '';
    }
});

taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('removebtn')) {
        e.target.parentElement.remove();
    }
});

taskList.addEventListener('change', (e) => {
    if (e.target.classList.contains('taskCheckbox')) {
        const taskItem = e.target.parentElement;
        if (e.target.checked) {
            taskItem.classList.add('completed');
        } else {
            taskItem.classList.remove('completed');
        }
    }
});

