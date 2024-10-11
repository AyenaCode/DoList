"use strict";
class TaskManager {
    constructor() {
        this.input = document.getElementById("task");
        this.addButton = document.getElementById("addBtn");
        this.taskList = document.getElementById("taskList");
        this.counter = document.getElementById("count");
        this.taskTab = [];
        if (this.addButton) {
            this.addButton.addEventListener("click", () => this.addTask());
        }
    }
    addTask() {
        if (this.input.value === "") {
            alert("Veuillez entrer une tâche");
        }
        else {
            const newTask = {
                id: Date.now(),
                title: this.input.value,
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
            const taskDiv = document.createElement("div");
            taskDiv.classList.add("task");
            taskDiv.innerHTML = `
        <p class="${task.completed ? "done" : ""}">${index + 1}-) ${task.title}</p>
        <button onclick="taskManager.taskDone(${task.id})">Terminé</button>
        <button onclick="taskManager.removeTask(${task.id})">Supprimer</button>
      `;
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
