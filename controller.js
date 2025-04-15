class TodoController {
  constructor(view) {
    this.view = view;
    this.todoManager = new TodoManager();
    this.currentFilter = "toutes";

    this.renderers = {
      travail: new TravailTodoRenderer(),
      maison: new MaisonTodoRenderer(),
      divers: new DiversTodoRenderer()
    };

    this.view.createForm(
      this.handleAddTodo.bind(this),
      this.handleFilterChange.bind(this)
    );

    this.render();
  }

  handleAddTodo(text, dueDate, category) {
    const todo = new Todo(text, dueDate, category);
    this.todoManager.addTodo(todo);
    this.render();
  }

  handleDeleteTodo(todoId) {
    this.todoManager.deleteTodo(todoId);
    this.render();
  }

  handleFilterChange(category) {
    this.currentFilter = category;
    this.render();
  }

  render() {
    let todos = this.todoManager.getTodos();
    if (this.currentFilter !== "toutes") {
      todos = todos.filter(todo => todo.category === this.currentFilter);
    }
    todos.sort((a, b) => a.dueDate - b.dueDate);
    this.view.renderTodos(todos, this.handleDeleteTodo.bind(this), this.renderers);
  }
}

const view = new TodoView();
const controller = new TodoController(view);
