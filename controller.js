// controller.js
class TaskController {
    constructor(view) {
      this.view = view;
      this.tasks = [];
  
      this.view.createForm(this.handleAddTask.bind(this));
      this.render();
    }
  
    handleAddTask(text, dueDate) {
      const task = new Task(text, dueDate);
      this.tasks.push(task);
      this.render();
    }
  
    handleDeleteTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
      this.render();
    }
  
    render() {
      this.tasks.sort((a, b) => a.dueDate - b.dueDate);
      this.view.renderTasks(this.tasks, this.handleDeleteTask.bind(this));
    }
  }
  
  const controller = new TaskController(view);
  