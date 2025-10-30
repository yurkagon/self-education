// Command Pattern - приклад з Button onClick

interface Command {
  execute(): void;
}

class SaveCommand implements Command {
  execute(): void {
    console.log('Saving...');
  }
}

class DeleteCommand implements Command {
  execute(): void {
    console.log('Deleting...');
  }
}

class Button {
  constructor(private command: Command) {}

  onClick(): void {
    this.command.execute();
  }
}

// Використання
const saveButton = new Button(new SaveCommand());
const deleteButton = new Button(new DeleteCommand());

saveButton.onClick();
deleteButton.onClick();
