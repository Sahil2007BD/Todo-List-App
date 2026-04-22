let todo = JSON.parse(localStorage.getItem("todo")) || [];

const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const AddButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

document.addEventListener("DOMContentLoaded", function () {
  AddButton.addEventListener("click", addTask);

  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
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
  todo = [];
  saveToLocalStorage();
  displayTasks();
}

function editTask(index) {
  const todoItem = document.getElementById(`todo-${index}`);
  const existingText = todo[index].text;

  const inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.value = existingText;

  todoItem.replaceWith(inputElement);
  inputElement.focus();

  inputElement.addEventListener("blur", function () {
    const updatedText = inputElement.value.trim();

    if (updatedText !== "") {
      todo[index].text = updatedText;
      saveToLocalStorage();
      displayTasks();
    } else {
      displayTasks();
    }
  });
}

function displayTasks() {
  todoList.innerHTML = "";

  todo.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("todo-container");

    div.innerHTML = `
      <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
        item.disabled ? "checked" : ""
      }>
      <p id="todo-${index}" class="${
        item.disabled ? "disabled" : ""
      }">${item.text}</p>
    `;

    div.querySelector(".todo-checkbox").addEventListener("change", () =>
      toggleTask(index)
    );

    div.querySelector("p").addEventListener("click", () =>
      editTask(index)
    );

    todoList.appendChild(div);
  });

  todoCount.textContent = todo.length;
}

function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}