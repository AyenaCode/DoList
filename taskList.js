const input = document.getElementById("task");
const addButton = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("count");

let taskTab = [];

// Ajouter une tâche avec les boutons "Terminé" et "Supprimer"
addButton.addEventListener("click", () => {
  if (input.value === "") {
    alert("Veuillez entrer une tâche");
  } else {
    const newTask = {
      id: Date.now(),
      title: input.value,
      completed: false,
    };
    taskTab.push(newTask);
    input.value = "";
    displayTask();
  }
});

/**
 * Afficher les tâches dans le DOM
 * @returns {void}
 *
 */
function displayTask() {
  taskList.innerHTML = "";
  taskTab.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.innerHTML = `
      <p class="${task.completed ? "done" : ""}">${index + 1}-) ${
      task.title
    }</p>
      <button id="doneBtn" onclick="taskDone(${task.id})">Terminé</button>
      <button onclick="removeTask(${task.id})">Supprimer</button>
    `;
    taskList.appendChild(taskDiv);
  });
  updateCounter();
}

/**
 * Supprimer une tâche
 * @param {number} id
 */
function removeTask(id) {
  taskTab = taskTab.filter((task) => task.id !== id);
  displayTask();
}

/**
 * Marquer une tâche comme terminée
 * @param {number} id
 */
function taskDone(id) {
  const task = taskTab.find((task) => task.id === id);
  if (task) {
    task.completed = !task.completed;
  }
  displayTask();
}

/**
 * Mettre à jour le compteur de tâches
 */
function updateCounter() {
  const remainingTasks = taskTab.filter((task) => !task.completed).length;
  counter.textContent = `Vous avez ${remainingTasks} tâches restantes`;
}
