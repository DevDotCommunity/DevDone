document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");
  const markAllDoneButton = document.getElementById("mark-all-done");

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
                <button class="delete-btn">Delete</button>
            `;

      const checkbox = li.querySelector("input");
      checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        li.querySelector("span").classList.toggle("completed");
        saveTodos();
        countListItems(); // Update task count when a task is checked/unchecked
      });

      const deleteBtn = li.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", () => {
        todos = todos.filter((t) => t.id !== todo.id);
        li.remove();
        saveTodos();
        countListItems(); // Update task count when a task is deleted
      });

      todoList.appendChild(li);
    });
    countListItems(); // Update task count after rendering
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

  markAllDoneButton.addEventListener("click", () => {
      todos.forEach(todo => todo.completed = true);
      saveTodos();
      renderTodos();
    
  });

  function countListItems() {
    const ulElement = document.getElementById('todo-list');
    const liElements = ulElement.getElementsByTagName('li');
    const itemCount = liElements.length;

    // Update the <h2> element instead of <p> element
    document.getElementById('itemcount').innerText = `Number of Tasks: ${itemCount}`;
  }

  // Initial render
  renderTodos();
});
//dark or light mode
let currMode = "light";
const change = () =>{
  if(currMode === "light"){
    currMode = "dark"; //changing value of currMode to dark 
    document.querySelector("button").innerText = "light"; //changing display
    document.querySelector("button").style.backgroundColor = "#f5f5f5";
    document.querySelector("button").style.color = "black";
    document.querySelector("body").style.backgroundColor = "black";
    document.querySelector("body").style.color = "#f5f5f5";
    document.querySelector("h1").style.color = "white";
  }
      
  else{
    currMode = "light"; //changing value of currMode to dark
    document.querySelector("button").innerText = "dark";//changing display
    document.querySelector("button").style.backgroundColor = "black";
    document.querySelector("button").style.color = "#f5f5f5";
    document.querySelector("body").style.backgroundColor = "#f5f5f5";
    document.querySelector("body").style.color = "black";
    document.querySelector("h1").style.color = "black";
  }
}
mode.addEventListener("click", change);