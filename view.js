// view.js
class TaskView {
    constructor() {
      this.taskList = document.getElementById("task-list");
      this.formContainer = document.getElementById("form-container");
    }
  
    createForm(onSubmit) {
      const inputText = document.createElement("input");
      inputText.type = "text";
      inputText.placeholder = "Nom de la tâche...";
      inputText.id = "task-input";
  
      const inputDate = document.createElement("input");
      inputDate.type = "date";
      inputDate.id = "task-date";
  
      const button = document.createElement("button");
      button.textContent = "Ajouter";
  
      const form = document.createElement("div");
      form.appendChild(inputText);
      form.appendChild(inputDate);
      form.appendChild(button);
  
      this.formContainer.appendChild(form);
  
      button.addEventListener("click", () => {
        const text = inputText.value.trim();
        const date = inputDate.value;
        if (text && date) {
          onSubmit(text, date);
          inputText.value = "";
          inputDate.value = "";
        }
      });
    }
  
    renderTasks(tasks, onDelete) {
      this.taskList.innerHTML = "";
      tasks.forEach(task => {
        const li = document.createElement("li");
  
        const textSpan = document.createElement("span");
        textSpan.textContent = `${task.text} – à faire avant le ${task.dueDate.toLocaleDateString()}`;
  
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.addEventListener("click", () => onDelete(task.id));
  
        li.appendChild(textSpan);
        li.appendChild(deleteBtn);
        this.taskList.appendChild(li);
      });
    }
  }
  
  const view = new TaskView();
  