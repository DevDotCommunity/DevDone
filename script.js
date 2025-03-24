document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");

  // Load todos from localStorage
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const renderTodos = () => {
    todoList.innerHTML = "";
    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.className = "todo-item";
      li.innerHTML = `
        <input type="checkbox" ${todo.completed ? "checked" : ""}>
        <span style="color: black" class="${todo.completed ? "completed" : ""}">${todo.text}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      `;

      const checkbox = li.querySelector("input");
      checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        li.querySelector("span").classList.toggle("completed");
        saveTodos();
        countListItems();
      });

      const deleteBtn = li.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", () => {
        todos = todos.filter((t) => t.id !== todo.id);
        li.remove();
        saveTodos();
        countListItems();
      });

      // Edit functionality
      const editBtn = li.querySelector(".edit-btn");
      const todoTextSpan = li.querySelector("span");
      editBtn.addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = "text";
        input.value = todo.text;
        input.classList.add("edit-input");

        // Replace span with input
        todoTextSpan.replaceWith(input);
        input.focus();

        const saveEdit = () => {
          const newText = input.value.trim();
          if (newText) {
            todo.text = newText;
            input.replaceWith(todoTextSpan);
            todoTextSpan.textContent = newText;
            saveTodos();
          } else {
            input.replaceWith(todoTextSpan);
          }
        };

        input.addEventListener("keypress", (e) => {
          if (e.key === "Enter") saveEdit();
        });

        input.addEventListener("blur", saveEdit);
      });

      todoList.appendChild(li);
    });
    countListItems();
  };

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
      const todo = {
        id: Date.now(),
        text,
        completed: false,
      };
      todos.push(todo);
      todoInput.value = "";
      saveTodos();
      renderTodos();
    }
  });

  function countListItems() {
    const ulElement = document.getElementById('todo-list');
    const liElements = ulElement.getElementsByTagName('li');
    const itemCount = liElements.length;
    document.getElementById('itemcount').innerText = `Number of Tasks: ${itemCount}`;
  }

  // Initial render
  renderTodos();
});

// Dark or light mode (fixed to target #mode specifically)
let currMode = "light";
const change = () => {
  const modeButton = document.getElementById("mode");
  if (currMode === "light") {
    currMode = "dark";
    modeButton.innerText = "light";
    modeButton.style.backgroundColor = "#f5f5f5";
    modeButton.style.color = "black";
    document.body.style.backgroundColor = "black";
    document.body.style.color = "#f5f5f5";
    document.querySelector("h1").style.color = "white";
  } else {
    currMode = "light";
    modeButton.innerText = "dark";
    modeButton.style.backgroundColor = "black";
    modeButton.style.color = "#f5f5f5";
    document.body.style.backgroundColor = "#f5f5f5";
    document.body.style.color = "black";
    document.querySelector("h1").style.color = "black";
  }
}
document.getElementById("mode").addEventListener("click", change);