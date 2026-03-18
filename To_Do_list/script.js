// Application State
let state = {
    tasks: JSON.parse(localStorage.getItem('pro_tasks')) || [],
    filter: 'all'
};

// Selectors
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const listContainer = document.getElementById('todo-list');
const itemsLeft = document.getElementById('items-left');

// Core Functions
function saveState() {
    localStorage.setItem('pro_tasks', JSON.stringify(state.tasks));
    render();
}

function addTask() {
    const text = input.value.trim();
    if (!text) return;

    state.tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    input.value = '';
    saveState();
}

function toggleTask(id) {
    state.tasks = state.tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);
    saveState();
}

function deleteTask(id) {
    state.tasks = state.tasks.filter(t => t.id !== id);
    saveState();
}

function editTask(id) {
    const task = state.tasks.find(t => t.id === id);
    const newText = prompt("Update task:", task.text);
    if (newText && newText.trim()) {
        task.text = newText.trim();
        saveState();
    }
}

// UI Rendering Logic
function render() {
    let filteredTasks = state.tasks.filter(t => {
        if (state.filter === 'active') return !t.completed;
        if (state.filter === 'completed') return t.completed;
        return true;
    });

    listContainer.innerHTML = filteredTasks.map(task => `
        <li class="task-item ${task.completed ? 'completed' : ''}">
            <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${task.id})">
            <span onclick="toggleTask(${task.id})">${task.text}</span>
            <div class="actions">
                <button class="edit-btn" onclick="editTask(${task.id})"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" onclick="deleteTask(${task.id})"><i class="fas fa-trash"></i></button>
            </div>
        </li>
    `).join('');

    itemsLeft.innerText = `${state.tasks.filter(t => !t.completed).length} items left`;
}

// Event Listeners
addBtn.addEventListener('click', addTask);
input.addEventListener('keypress', (e) => e.key === 'Enter' && addTask());

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        e.target.classList.add('active');
        state.filter = e.target.dataset.filter;
        render();
    });
});

// Initialization
document.getElementById('date-display').innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
render();