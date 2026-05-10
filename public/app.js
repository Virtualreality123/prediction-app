class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.storageKey = 'todoAppData';
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Add task button
        document.getElementById('addBtn').addEventListener('click', () => this.addTodo());

        // Enter key to add task
        document.getElementById('todoInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });

        // Clear completed button
        document.getElementById('clearBtn').addEventListener('click', () => this.clearCompleted());

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach((btn) => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });
    }

    addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();

        if (!text) {
            alert('Please enter a task!');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString(),
        };

        this.todos.unshift(todo);
        input.value = '';
        input.focus();
        this.saveToStorage();
        this.render();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this.saveToStorage();
        this.render();
    }

    toggleTodo(id) {
        const todo = this.todos.find((t) => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveToStorage();
            this.render();
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;

        // Update active button
        document.querySelectorAll('.filter-btn').forEach((btn) => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            }
        });

        this.render();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter((todo) => !todo.completed);
            case 'completed':
                return this.todos.filter((todo) => todo.completed);
            default:
                return this.todos;
        }
    }

    clearCompleted() {
        if (this.todos.some((todo) => todo.completed)) {
            if (confirm('Are you sure you want to delete all completed tasks?')) {
                this.todos = this.todos.filter((todo) => !todo.completed);
                this.saveToStorage();
                this.render();
            }
        }
    }

    saveToStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
    }

    loadFromStorage() {
        const data = localStorage.getItem(this.storageKey);
        if (data) {
            try {
                this.todos = JSON.parse(data);
            } catch (e) {
                console.error('Error loading todos from storage:', e);
                this.todos = [];
            }
        }
    }

    render() {
        const todoList = document.getElementById('todoList');
        const filteredTodos = this.getFilteredTodos();

        if (filteredTodos.length === 0) {
            todoList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📝</div>
                    <div class="empty-state-text">
                        ${this.currentFilter === 'all' ? 'No tasks yet. Add one to get started!' : `No ${this.currentFilter} tasks.`}
                    </div>
                </div>
            `;
        } else {
            todoList.innerHTML = filteredTodos
                .map(
                    (todo) => `
                    <div class="todo-item ${todo.completed ? 'completed' : ''}">
                        <input
                            type="checkbox"
                            class="checkbox"
                            ${todo.completed ? 'checked' : ''}
                            onchange="app.toggleTodo(${todo.id})"
                        />
                        <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                        <button class="delete-btn" onclick="app.deleteTodo(${todo.id})">Delete</button>
                    </div>
                `
                )
                .join('');
        }

        this.updateStats();
    }

    updateStats() {
        const activeTodos = this.todos.filter((todo) => !todo.completed).length;
        const taskText = activeTodos === 1 ? 'task' : 'tasks';
        document.getElementById('taskCount').textContent = `${activeTodos} ${taskText}`;

        const clearBtn = document.getElementById('clearBtn');
        clearBtn.disabled = !this.todos.some((todo) => todo.completed);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

const app = new TodoApp();
