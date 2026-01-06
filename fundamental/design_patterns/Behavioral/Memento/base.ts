// Memento Pattern - максимально простий приклад

// Memento - зберігає стан
class Memento {
  private text: string

  constructor(text: string) {
    this.text = text;
  }

  getText(): string {
    return this.text;
  }
}

// Caretaker - зберігає історію
class History {
  private history: Memento[] = [];

  save(memento: Memento): void {
    this.history.push(memento);
  }

  undo(): Memento | null {
    return this.history.pop() || null;
  }
}


// Originator - об'єкт, стан якого зберігаємо
class TextEditor {
  private text: string = '';

  setText(text: string): void {
    this.text = text;
  }

  getText(): string {
    return this.text;
  }

  // Зберігаємо поточний стан
  save(): Memento {
    return new Memento(this.text);
  }

  // Відновлюємо збережений стан
  restore(memento: Memento): void {
    this.text = memento.getText();
  }
}

// Використання
const editor = new TextEditor();
const history = new History();

// Пишемо текст
editor.setText('Привіт');
history.save(editor.save());

editor.setText('Привіт, світ!');
history.save(editor.save());

editor.setText('Привіт, світ! Я тут.');

// Відкат (undo)
const previous = history.undo();
if (previous) {
  editor.restore(previous);
}

console.log(editor.getText()); // "Привіт, світ!"

