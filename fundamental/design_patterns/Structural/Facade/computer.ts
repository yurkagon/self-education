// Facade Pattern - Комп'ютерна система

// Підсистема CPU
class CPU {
  public freeze(): void {
    console.log('CPU: Freezing...');
  }

  public jump(position: number): void {
    console.log(`CPU: Jumping to position ${position}`);
  }

  public execute(): void {
    console.log('CPU: Executing instructions...');
  }
}

// Підсистема Memory
class Memory {
  public load(position: number, data: string): void {
    console.log(`Memory: Loading data "${data}" at position ${position}`);
  }

  public get(position: number): string {
    console.log(`Memory: Getting data from position ${position}`);
    return 'boot_data';
  }
}

// Підсистема HardDrive
class HardDrive {
  public read(lba: number, size: number): string {
    console.log(`HardDrive: Reading ${size} sectors from LBA ${lba}`);
    return 'boot_sector_data';
  }
}

// Підсистема BIOS
class BIOS {
  public initialize(): void {
    console.log('BIOS: Initializing hardware...');
  }

  public performPOST(): boolean {
    console.log('BIOS: Performing Power-On Self-Test...');
    return true;
  }

  public loadBootloader(): void {
    console.log('BIOS: Loading bootloader...');
  }
}

// Facade - Комп'ютер
class Computer {
  private cpu: CPU;
  private memory: Memory;
  private hardDrive: HardDrive;
  private bios: BIOS;

  constructor() {
    this.cpu = new CPU();
    this.memory = new Memory();
    this.hardDrive = new HardDrive();
    this.bios = new BIOS();
  }

  // Спрощений метод запуску комп'ютера
  public startComputer(): void {
    console.log('=== Starting Computer ===');

    // Ініціалізація BIOS
    this.bios.initialize();

    // POST (Power-On Self-Test)
    if (!this.bios.performPOST()) {
      console.log('Computer: POST failed!');
      return;
    }

    // Завантаження bootloader
    this.bios.loadBootloader();

    // Робота з пам'яттю
    this.memory.load(0, 'boot_data');

    // Робота з жорстким диском
    const bootData = this.hardDrive.read(0, 1);
    this.memory.load(0, bootData);

    // Робота з CPU
    this.cpu.freeze();
    this.cpu.jump(0);
    this.cpu.execute();

    console.log('Computer: Successfully started!');
  }

  // Спрощений метод зупинки комп'ютера
  public shutdownComputer(): void {
    console.log('=== Shutting Down Computer ===');

    // Зупинка CPU
    this.cpu.freeze();

    // Очищення пам'яті
    console.log('Memory: Clearing memory...');

    // Зупинка жорсткого диска
    console.log('HardDrive: Stopping...');

    console.log('Computer: Successfully shut down!');
  }

  // Спрощений метод перезавантаження
  public restartComputer(): void {
    console.log('=== Restarting Computer ===');
    this.shutdownComputer();
    console.log('Computer: Restarting...');
    this.startComputer();
  }

  // Додаткові методи
  public getSystemInfo(): string {
    return 'Computer System Info:\n' +
           '- CPU: Intel Core i7\n' +
           '- Memory: 16GB RAM\n' +
           '- HardDrive: 1TB SSD\n' +
           '- BIOS: UEFI 2.0';
  }

  public runApplication(appName: string): void {
    console.log(`Computer: Starting application "${appName}"...`);
    this.cpu.execute();
    console.log(`Computer: Application "${appName}" is running`);
  }
}

// Приклад використання
const computer = new Computer();

console.log('=== Computer Facade Demo ===');
console.log(computer.getSystemInfo());

// Запуск комп'ютера
computer.startComputer();

// Запуск додатку
computer.runApplication('Text Editor');

// Перезавантаження
computer.restartComputer();
