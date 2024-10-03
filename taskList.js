const input = document.getElementById("task");
const addButton = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("count");

const taskTab = [];

// Ajouter une tâche avec les boutons "Terminé" et "Supprimer"
addButton.addEventListener("click", () => {
  if (input.value === "") {
    alert("Veuillez entrer une tâche");
  } else {
    taskTab.push(input.value);
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
      <p>${index + 1}-) ${task}</p>
      <button id="doneBtn" onclick="taskDone(${index})">Terminé</button>
      <button id="delete" onclick="removeTask(${index})">Supprimer</button>
    `;
    taskList.appendChild(taskDiv);
  });
  counter.textContent = `Vous avez ${taskTab.length} tâches`;
}

/**
 * Supprimer une tâche
 * @param {number} index
 */
function removeTask(index) {
  taskTab.splice(index, 1);
  displayTask();
}
/**
 * Marquer une tâche comme terminée
 * @param {number} index
 */
function taskDone(index) {
  taskList.children[index].firstElementChild.classList.toggle("done");
  // Mettre à jour le compteur en diminuant le nombre de tâches
  const doneTasks = taskList.querySelectorAll(".done").length;
  counter.textContent = `Vous avez ${
    taskTab.length - doneTasks
  } tâches restantes`;
}
