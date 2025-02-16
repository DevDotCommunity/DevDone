document.addEventListener("DOMContentLoaded", () => {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
    const itemCount = document.getElementById("itemcount");

    // Fetch todos from backend
    const fetchTodos = async () => {
        const response = await fetch("/todos");
        const todos = await response.json();
        renderTodos(todos);
    };

    // Add a new todo
    todoForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (text) {
            const response = await fetch("/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: Date.now(), text })
            });
            const newTodo = await response.json();
            renderTodos([...document.todos, newTodo]);
            todoInput.value = "";
        }
    });

    // Render Todos
    const renderTodos = (todos) => {
        document.todos = todos;
        todoList.innerHTML = "";
        todos.forEach((todo) => {
            const li = document.createElement("li");
            li.className = "todo-item";
            li.innerHTML = `
                <input type="checkbox" ${todo.completed ? "checked" : ""}>
                <span class="${todo.completed ? "completed" : ""}">${todo.text}</span>
                <button class="delete-btn">Delete</button>
            `;

            const checkbox = li.querySelector("input");
            checkbox.addEventListener("change", async () => {
                await fetch(`/todos/${todo.id}`, { method: "PUT" });
                fetchTodos();
            });

            const deleteBtn = li.querySelector(".delete-btn");
            deleteBtn.addEventListener("click", async () => {
                await fetch(`/todos/${todo.id}`, { method: "DELETE" });
                fetchTodos();
            });

            todoList.appendChild(li);
        });
        updateTaskCount(todos.length);
    };

    // Update Task Count
    const updateTaskCount = (count) => {
        itemCount.innerText = `Number of Tasks: ${count}`;
    };

    // Initial fetch
    fetchTodos();
});
