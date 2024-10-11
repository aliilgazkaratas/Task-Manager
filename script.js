// Select elements
const addTaskBtn = document.getElementById('add-task-btn');
const newTaskInput = document.getElementById('new-task');
const tasksList = document.getElementById('tasks');
const prioritySelect = document.getElementById('priority-level');
const categorySelect = document.getElementById('task-category'); // Select element for categories
const sortSelect = document.getElementById('sort-tasks');

// Define category colors
const categoryColors = {
    work: '#007bff',        // Blue
    personal: '#28a745',    // Green
    study: '#ffc107',       // Yellow
    shopping: '#dc3545',    // Red
};

// Load tasks from localStorage when the document is ready
document.addEventListener('DOMContentLoaded', loadTasks);

// Function to add a new task with category, priority, completion, and deletion features
function addTask() {
    const taskText = newTaskInput.value.trim();
    const priority = prioritySelect.value;
    const category = categorySelect.value;

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    // Create a new task object
    const task = {
        text: taskText,
        completed: false,
        priority: priority,
        category: category // Add category to task object
    };

    // Save the task to localStorage
    saveTaskToLocalStorage(task);

    // Clear the task list and reload sorted tasks
    clearTaskList();
    loadTasks();

    // Clear the input field and reset selectors
    newTaskInput.value = '';
    prioritySelect.value = 'low';
    categorySelect.value = 'work'; // Reset to default category
}

// Event listener for the "Add Task" button
addTaskBtn.addEventListener('click', addTask);


// Function to append a task to the DOM
function appendTaskToDOM(task) {
    const taskItem = document.createElement('li');
    taskItem.classList.add(task.priority); // Add class based on priority level
    
    // Create a checkbox for task completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;

    // Create a span to hold the task text
    const taskSpan = document.createElement('span');
    taskSpan.textContent = task.text;

    if (task.completed) {
        taskSpan.classList.add('completed');
    }

    // Add event listener to toggle completion status based on checkbox
    checkbox.addEventListener('change', function () {
        task.completed = checkbox.checked;
        taskSpan.classList.toggle('completed');
        updateLocalStorage();
    });

    // Create a delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    // Add event listener to delete the task
    deleteBtn.addEventListener('click', function () {
        tasksList.removeChild(taskItem);
        deleteTaskFromLocalStorage(task.text);
    });

    // Append checkbox, task text, and delete button to taskItem
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskSpan);

    // Add a label to show the priority level
    const priorityLabel = document.createElement('span');
    priorityLabel.classList.add('priority-label');
    priorityLabel.textContent = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
    taskItem.appendChild(priorityLabel);

    // Add a label to show the category and apply color
    const categoryLabel = document.createElement('span');
    categoryLabel.classList.add('category-label');
    categoryLabel.textContent = ` [${task.category.charAt(0).toUpperCase() + task.category.slice(1)}]`; // Display category

    // Set the color of the category label
    categoryLabel.style.color = categoryColors[task.category]; // Set color based on category
    taskItem.appendChild(categoryLabel);

    taskItem.appendChild(deleteBtn);

    // Add the new task to the task list
    tasksList.appendChild(taskItem);
}

// Function to save a task to localStorage
function saveTaskToLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage and display them (sorted by user selection)
function loadTasks() {
    let tasks = getTasksFromLocalStorage();
    sortTasks(tasks); // Sort the tasks based on the selected sort option
    tasks.forEach(task => appendTaskToDOM(task));
}

// Function to get tasks from localStorage
function getTasksFromLocalStorage() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Function to update tasks in localStorage
function updateLocalStorage() {
    let tasks = [];
    document.querySelectorAll('#tasks li').forEach(taskItem => {
        const taskText = taskItem.querySelector('span').textContent;
        const isCompleted = taskItem.querySelector('input').checked;
        const priority = taskItem.classList[0]; // Get priority from class name
        const category = taskItem.querySelector('.category-label').textContent.slice(1, -1).toLowerCase(); // Get category from the label
        tasks.push({ text: taskText, completed: isCompleted, priority: priority, category: category });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to delete a task from localStorage
function deleteTaskFromLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to clear the task list in the DOM
function clearTaskList() {
    tasksList.innerHTML = '';
}

// Function to sort tasks based on user selection
function sortTasks(tasks) {
    const sortBy = sortSelect.value; // Get the selected sort option
    if (sortBy === 'priority') {
        tasks.sort(compareTasksByPriorityAndCompletion);
    } else if (sortBy === 'completion') {
        tasks.sort(compareTasksByCompletionStatus);
    } else if (sortBy === 'alphabetical') {
        tasks.sort(compareTasksAlphabetically);
    } else if (sortBy === 'category') {
        tasks.sort(compareTasksByCategory);
    }
}

// Sorting function to compare tasks by category
function compareTasksByCategory(a, b) {
    return a.category.localeCompare(b.category);
}

// Other sorting functions remain the same...

// Event listener for the "Add Task" button
addTaskBtn.addEventListener('click', addTask);

// Event listener for the sort dropdown
sortSelect.addEventListener('change', function() {
    clearTaskList();
    loadTasks(); // Reload tasks to apply the selected sorting
});
document.addEventListener('DOMContentLoaded', () => {
    const enBtn = document.getElementById('en-btn');
    const trBtn = document.getElementById('tr-btn');
    const darkModeBtn = document.getElementById('dark-mode-btn');

    // Toggle Dark Mode
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Change button text based on the current mode
        if (document.body.classList.contains('dark-mode')) {
            darkModeBtn.textContent = 'Light Mode';
        } else {
            darkModeBtn.textContent = 'Dark Mode';
        }
    });

    // Elements to translate
    const pageTitle = document.getElementById('page-title');
    const newTaskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const priorityOptions = document.querySelectorAll('#priority-level option');
    const categoryOptions = document.querySelectorAll('#task-category option');

    // Language Data
    const translations = {
        en: {
            pageTitle: 'Task Manager',
            newTaskPlaceholder: 'Add a new task...',
            addTaskText: 'Add Task'
        },
        tr: {
            pageTitle: 'Görev Yöneticisi',
            newTaskPlaceholder: 'Yeni görev ekleyin...',
            addTaskText: 'Görev Ekle'
        }
    };

    // Switch to English
    enBtn.addEventListener('click', () => {
        changeLanguage('en');
    });

    // Switch to Turkish
    trBtn.addEventListener('click', () => {
        changeLanguage('tr');
    });

    function changeLanguage(lang) {
        pageTitle.textContent = translations[lang].pageTitle;
        newTaskInput.placeholder = translations[lang].newTaskPlaceholder;
        addTaskBtn.textContent = translations[lang].addTaskText;

        priorityOptions.forEach(option => {
            option.textContent = option.dataset[lang];
        });

        categoryOptions.forEach(option => {
            option.textContent = option.dataset[lang];
        });
    }

    // Default language is English
    changeLanguage('en');
});
