class Todo {
  constructor(text, dueDate, category) {
    this.id = Date.now();
    this.text = text;
    this.dueDate = new Date(dueDate);
    this.category = category;
  }
}

class TodoManager {
  constructor() {
    if (TodoManager.instance) {
      return TodoManager.instance;
    }
    this.todos = [];
    TodoManager.instance = this;
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  deleteTodo(todoId) {
    this.todos = this.todos.filter(todo => todo.id !== todoId);
  }

  getTodos() {
    return this.todos;
  }
}
