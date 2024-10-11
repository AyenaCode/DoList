interface Task {
  id: number;
  title: string;
  completed: boolean;
}

class TaskManager {
  private input: HTMLInputElement;
  private addButton: HTMLButtonElement;
  private taskList: HTMLElement;
  private counter: HTMLElement;
  private taskTab: Task[];

  constructor() {
    this.input = document.getElementById("task") as HTMLInputElement;
    this.addButton = document.getElementById("addBtn") as HTMLButtonElement;
    this.taskList = document.getElementById("taskList") as HTMLElement;
    this.counter = document.getElementById("count") as HTMLElement;
    this.taskTab = [];

    if (this.addButton) {
      this.addButton.addEventListener("click", () => this.addTask());
    }
  }

  private addTask(): void {
    if (this.input.value === "") {
      alert("Veuillez entrer une tâche");
    } else {
      const newTask: Task = {
        id: Date.now(),
        title: this.input.value,
        completed: false,
      };
      this.taskTab.push(newTask);
      this.input.value = "";
      this.displayTask();
    }
  }

  private displayTask(): void {
    this.taskList.innerHTML = "";
    this.taskTab.forEach((task, index) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task");
      taskDiv.innerHTML = `
        <p class="${task.completed ? "done" : ""}">${index + 1}-) ${
        task.title
      }</p>
        <button onclick="taskManager.taskDone(${task.id})">Terminé</button>
        <button onclick="taskManager.removeTask(${task.id})">Supprimer</button>
      `;
      this.taskList.appendChild(taskDiv);
    });
    this.updateCounter();
  }

  public removeTask(id: number): void {
    this.taskTab = this.taskTab.filter((task) => task.id !== id);
    this.displayTask();
  }

  public taskDone(id: number): void {
    const task = this.taskTab.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
    }
    this.displayTask();
  }

  private updateCounter(): void {
    const remainingTasks = this.taskTab.filter(
      (task) => !task.completed
    ).length;
    this.counter.textContent = `Vous avez ${remainingTasks} tâches restantes`;
  }
}

const taskManager = new TaskManager();
