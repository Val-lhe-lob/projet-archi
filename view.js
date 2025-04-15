class TodoView {
  constructor() {
    this.todoList = document.getElementById("task-list");
    this.formContainer = document.getElementById("form-container");
  }

  createForm(onSubmit, onFilterChange) {
    const inputText = document.createElement("input");
    inputText.type = "text";
    inputText.placeholder = "Nom de la tâche";
    inputText.id = "todo-input";

    const inputDate = document.createElement("input");
    inputDate.type = "date";
    inputDate.id = "todo-date";

    const selectCategory = document.createElement("select");
    selectCategory.id = "todo-category";
    ["travail", "maison", "divers"].forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      selectCategory.appendChild(option);
    });

    const button = document.createElement("button");
    button.textContent = "Ajouter";

    const filterSelect = document.createElement("select");
    filterSelect.id = "filter-category";
    ["toutes", "travail", "maison", "divers"].forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      filterSelect.appendChild(option);
    });
    filterSelect.addEventListener("change", () => {
      onFilterChange(filterSelect.value);
    });

    const form = document.createElement("div");
    form.appendChild(inputText);
    form.appendChild(inputDate);
    form.appendChild(selectCategory);
    form.appendChild(button);
    form.appendChild(filterSelect);

    this.formContainer.appendChild(form);

    button.addEventListener("click", () => {
      const text = inputText.value.trim();
      const date = inputDate.value;
      const category = selectCategory.value;
      if (text && date && category) {
        onSubmit(text, date, category);
        inputText.value = "";
        inputDate.value = "";
        selectCategory.selectedIndex = 0;
      }
    });
  }

  renderTodos(todos, onDelete, renderers) {
    this.todoList.innerHTML = "";
    todos.forEach(todo => {
      let renderer;
      switch (todo.category) {
        case "travail":
          renderer = renderers.travail;
          break;
        case "maison":
          renderer = renderers.maison;
          break;
        case "divers":
          renderer = renderers.divers;
          break;
        default:
          return;
      }

      const li = renderer.render(todo);
      li.classList.add("todo", todo.category);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "❌";
      deleteBtn.addEventListener("click", () => onDelete(todo.id));

      li.appendChild(deleteBtn);
      this.todoList.appendChild(li);
    });
  }
}

// Classe abstraite
class TodoRenderer {
  render(todo) {
    throw new Error("La méthode 'render' doit être implémentée.");
  }
}

// Renderers par catégorie
class TravailTodoRenderer extends TodoRenderer {
  render(todo) {
    const li = document.createElement("li");
    li.textContent = `${todo.text} – à faire avant le ${todo.dueDate.toLocaleDateString()}`;
    return li;
  }
}

class MaisonTodoRenderer extends TodoRenderer {
  render(todo) {
    const li = document.createElement("li");
    li.textContent = `${todo.text} – à faire avant le ${todo.dueDate.toLocaleDateString()}`;
    return li;
  }
}

class DiversTodoRenderer extends TodoRenderer {
  render(todo) {
    const li = document.createElement("li");
    li.textContent = `${todo.text} – à faire avant le ${todo.dueDate.toLocaleDateString()}`;
    return li;
  }
}
