// Retrieve todo from local storage or initialize an empty array

let todo = JSON.parse(localStorage.getItem("todo")) || [];




const todoInput = document.getElementById("todoInput");

const todoList = document.getElementById("todoList");

const todocount = document.getElementById("todoCount");

const AddButton = document.querySelector(".btn");

const deleteButton = document.getElementById("deleteButton");

// Function to render the todo list

document.addEventListener("DOMContentLoaded", function() {
    AddButton.addEventListener("click", addTask);
    todoInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission
            addTask();
        }
    });
    deleteButton.addEventListener("click", deleteAllTasks);
    displayTasks();
});



function addTask() {
    const newTask = todoInput.value.trim();
    if (newTask !== "") {
        todo.push({
            text: newTask, 
            disabled: false,
        });
        saveToLocalStorage();
        todoInput.value = "";
        displayTasks();
  }
}

function deleteAllTasks() {
   
}

function displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
      item.disabled ? "checked" : ""
    }>
        <p id="todo-${index}" class="${
      item.disabled ? "disabled" : ""
    }" onclick="editTask(${index})">${item.text}</p>
      </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change", () =>
      toggleTask(index)
    );
    todoList.appendChild(p);
  });
  todoCount.textContent = todo.length;
}

function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(todo));
};