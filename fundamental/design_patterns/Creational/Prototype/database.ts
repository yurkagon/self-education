// Приклад Prototype патерну з підключеннями до бази даних

interface ConnectionConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl: boolean;
  timeout: number;
}

interface PoolConfig {
  min: number;
  max: number;
  idle: number;
  acquire: number;
}

class DatabaseConnection {
  private config: ConnectionConfig;
  private pool: PoolConfig;
  private isConnected: boolean;
  private connectionId: string;
  private createdAt: Date;

  constructor(config: ConnectionConfig, pool: PoolConfig) {
    this.config = config;
    this.pool = pool;
    this.isConnected = false;
    this.connectionId = this.generateId();
    this.createdAt = new Date();
  }

  // Метод клонування з глибоким копіюванням
  public clone(): DatabaseConnection {
    const cloned = new DatabaseConnection(
      { ...this.config },
      { ...this.pool }
    );
    // Клоноване підключення має новий ID та час створення
    cloned.connectionId = this.generateId();
    cloned.createdAt = new Date();
    return cloned;
  }

  // Метод для створення підключення з іншими параметрами
  public cloneWithConfig(newConfig: Partial<ConnectionConfig>): DatabaseConnection {
    const cloned = this.clone();
    cloned.config = { ...cloned.config, ...newConfig };
    return cloned;
  }

  // Метод для створення підключення з іншим пулом
  public cloneWithPool(newPool: Partial<PoolConfig>): DatabaseConnection {
    const cloned = this.clone();
    cloned.pool = { ...cloned.pool, ...newPool };
    return cloned;
  }

  // Симуляція підключення
  public async connect(): Promise<void> {
    console.log(`Connecting to ${this.config.host}:${this.config.port}/${this.config.database}`);
    // Симуляція затримки підключення
    await new Promise(resolve => setTimeout(resolve, 100));
    this.isConnected = true;
    console.log(`Connected with ID: ${this.connectionId}`);
  }

  // Симуляція відключення
  public async disconnect(): Promise<void> {
    if (this.isConnected) {
      console.log(`Disconnecting ${this.connectionId}`);
      this.isConnected = false;
    }
  }

  // Симуляція виконання запиту
  public async query(sql: string): Promise<any> {
    if (!this.isConnected) {
      throw new Error('Not connected to database');
    }
    console.log(`Executing query on ${this.connectionId}: ${sql}`);
    return { result: 'success', connectionId: this.connectionId };
  }

  // Приватний метод для генерації ID
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Метод для отримання інформації про підключення
  public getInfo(): string {
    return `Connection ID: ${this.connectionId}, Host: ${this.config.host}:${this.config.port}, Connected: ${this.isConnected}`;
  }
}

// Приклад використання
const defaultConnection = new DatabaseConnection(
  {
    host: 'localhost',
    port: 5432,
    database: 'myapp',
    username: 'admin',
    password: 'secret',
    ssl: false,
    timeout: 30000
  },
  {
    min: 2,
    max: 10,
    idle: 10000,
    acquire: 30000
  }
);

console.log('Default connection:', defaultConnection.getInfo());

// Клонування для тестової бази
const testConnection = defaultConnection.cloneWithConfig({
  database: 'myapp_test',
  host: 'test-db.example.com'
});

console.log('Test connection:', testConnection.getInfo());

// Клонування з іншим пулом для production
const productionConnection = defaultConnection.cloneWithPool({
  min: 5,
  max: 20,
  idle: 30000
});

console.log('Production connection:', productionConnection.getInfo());

// Демонстрація роботи з підключеннями
async function demonstrateConnections() {
  // Підключення до основної бази
  await defaultConnection.connect();
  await defaultConnection.query('SELECT * FROM users');

  // Підключення до тестової бази
  await testConnection.connect();
  await testConnection.query('SELECT * FROM test_users');

  // Відключення
  await defaultConnection.disconnect();
  await testConnection.disconnect();
}

// Запуск демонстрації
demonstrateConnections().catch(console.error);
