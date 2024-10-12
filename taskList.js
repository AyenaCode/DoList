"use strict";
class TaskManager {
    constructor() {
        this.input = document.querySelector("#task");
        this.addButton = document.querySelector("#addBtn");
        this.taskList = document.querySelector("#taskList");
        this.counter = document.querySelector("#count");
        this.taskTab = [];
        if (this.addButton) {
            this.addButton.addEventListener("click", () => this.addTask());
        }
    }
    addTask() {
        if (this.input.value.trim() === "") {
            alert("Veuillez entrer une tâche");
        }
        else {
            const newTask = {
                id: Date.now(),
                title: this.input.value.trim(),
                completed: false,
            };
            this.taskTab.push(newTask);
            this.input.value = "";
            this.displayTask();
        }
    }
    displayTask() {
        this.taskList.innerHTML = "";
        this.taskTab.forEach((task, index) => {
            var _a, _b;
            const taskDiv = document.createElement("div");
            taskDiv.classList.add("task");
            taskDiv.innerHTML = `
        <p class="${task.completed ? "done" : ""}">${index + 1}-) ${task.title}</p>
        <button class="doneBtn">Terminé</button>
        <button class="removeBtn">Supprimer</button>
      `;
            (_a = taskDiv
                .querySelector(".doneBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => this.taskDone(task.id));
            (_b = taskDiv
                .querySelector(".removeBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => this.removeTask(task.id));
            this.taskList.appendChild(taskDiv);
        });
        this.updateCounter();
    }
    removeTask(id) {
        this.taskTab = this.taskTab.filter((task) => task.id !== id);
        this.displayTask();
    }
    taskDone(id) {
        const task = this.taskTab.find((task) => task.id === id);
        if (task) {
            task.completed = !task.completed;
        }
        this.displayTask();
    }
    updateCounter() {
        const remainingTasks = this.taskTab.filter((task) => !task.completed).length;
        this.counter.textContent = `Vous avez ${remainingTasks} tâches restantes`;
    }
}
const taskManager = new TaskManager();
