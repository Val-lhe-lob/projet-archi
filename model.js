
class Task {
  constructor(text, dueDate) {
    this.id = Date.now();
    this.text = text;
    this.dueDate = new Date(dueDate); // objet Date
  }
}