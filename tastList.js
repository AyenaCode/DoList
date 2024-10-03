const input = document.getElementById("task");
const addButton = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("count");

const taskTab = [];

// Ajout de tâche
const addTask = () => {
  if (input.value.trim() === "") return;

  const newTask = {
    text: input.value.trim(),
    completed: false,
  };
  taskTab.push(newTask);
  renderTask();
};

// L'event d'ajout
addButton.addEventListener("click", () => {
  addTask();
  input.value = "";
});

// Gestion globale des tâches
function renderTask() {
  taskList.innerHTML = "";

  taskTab.forEach((task, index) => {
    const li = createElement("li", task.text);
    //Completer la tâche
    if (task.completed) {
      li.style.textDecoration = "line-through";
    }

    // Bouton terminer la tâche
    const completeButton = createElement("button", "Terminer");
    completeButton.addEventListener("click", () => {
      taskTab[index].completed = !taskTab[index].completed;
      renderTask();
    });

    // Bouton de suppression
    const deteleButton = createElement("button", "Supprimer");
    deteleButton.addEventListener("click", () => {
      taskTab.splice(index, 1);
      renderTask();
    });

    //Append
    li.appendChild(completeButton);
    li.appendChild(deteleButton);
    taskList.appendChild(li);
  });

  //Conteur
  const dotaskTask = taskTab.filter((tast) => tast.completed);
  counter.innerText = `Vous avez terminé ${dotaskTask.length} sur ${taskTab.length} tâche(s) à faire`;
}

//dom
function createElement(tag, content, atributs = {}) {
  const element = document.createElement(tag);
  element.textContent = content;
  if (atributs != {}) {
    for (const key in atributs) {
      element.setAttribute(key, atributs[key]);
    }
  }

  return element;
}
