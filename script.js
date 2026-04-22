/* script.js */

let todo = JSON.parse(localStorage.getItem("todo")) || [];

const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

document.addEventListener("DOMContentLoaded", () => {
  addButton.addEventListener("click", addTask);

  todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTask();
    }
  });

  deleteButton.addEventListener("click", deleteAllTasks);

  displayTasks();
});

function addTask() {
  const task = todoInput.value.trim();

  if (task === "") return;

  todo.push({
    text: task,
    completed: false
  });

  todoInput.value = "";
  saveData();
  displayTasks();
}

function displayTasks() {
  todoList.innerHTML = "";

  todo.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("todo-container");

    div.innerHTML = `
      <div class="todo-left">
        <input
          type="checkbox"
          ${item.completed ? "checked" : ""}
        >
        <p class="todo-text ${item.completed ? "completed" : ""}">
          ${item.text}
        </p>
      </div>
    `;

    const checkbox = div.querySelector("input");
    const text = div.querySelector("p");

    checkbox.addEventListener("change", () => {
      toggleTask(index);
    });

    text.addEventListener("click", () => {
      editTask(index);
    });

    todoList.appendChild(div);
  });

  updateProgress();
  todoCount.textContent = todo.length;
}

function toggleTask(index) {
  todo[index].completed = !todo[index].completed;
  saveData();
  displayTasks();

  if (
    todo.length > 0 &&
    todo.every(task => task.completed)
  ) {
    launchConfetti();
  }
}

function editTask(index) {
  const updated = prompt("Edit your task:", todo[index].text);

  if (updated !== null && updated.trim() !== "") {
    todo[index].text = updated.trim();
    saveData();
    displayTasks();
  }
}

function deleteAllTasks() {
  todo = [];
  saveData();
  displayTasks();
}

function updateProgress() {
  const total = todo.length;
  const completed = todo.filter(task => task.completed).length;

  const percent = total === 0
    ? 0
    : Math.round((completed / total) * 100);

  progressFill.style.width = percent + "%";
  progressText.textContent = percent + "%";
}

function saveData() {
  localStorage.setItem("todo", JSON.stringify(todo));
}

/* Celebration Animation */

function launchConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confetti = [];

  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 150 + 50
    });
  }

  let angle = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach((c) => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${Math.random() * 360},100%,60%)`;
      ctx.fill();

      c.y += Math.cos(angle + c.d) + 2 + c.r / 2;
      c.x += Math.sin(angle);

      if (c.y > canvas.height) {
        c.y = -10;
      }
    });

    angle += 0.01;
  }

  let animation = setInterval(draw, 20);

  setTimeout(() => {
    clearInterval(animation);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 4000);
}