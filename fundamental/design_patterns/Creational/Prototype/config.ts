// Приклад Prototype патерну з конфігурацією

interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl: boolean;
}

interface CacheConfig {
  enabled: boolean;
  ttl: number;
  maxSize: number;
}

interface LoggingConfig {
  level: 'debug' | 'info' | 'warn' | 'error';
  file: string;
  console: boolean;
}

class ApplicationConfig {
  private database: DatabaseConfig;
  private cache: CacheConfig;
  private logging: LoggingConfig;
  private environment: string;

  constructor(
    database: DatabaseConfig,
    cache: CacheConfig,
    logging: LoggingConfig,
    environment: string
  ) {
    this.database = database;
    this.cache = cache;
    this.logging = logging;
    this.environment = environment;
  }

  // Метод клонування з глибоким копіюванням
  public clone(): ApplicationConfig {
    return new ApplicationConfig(
      { ...this.database },
      { ...this.cache },
      { ...this.logging },
      this.environment
    );
  }

  // Метод для створення конфігурації для різних середовищ
  public cloneForEnvironment(environment: string): ApplicationConfig {
    const cloned = this.clone();
    cloned.environment = environment;

    // Адаптація конфігурації для різних середовищ
    if (environment === 'production') {
      cloned.logging.level = 'warn';
      cloned.cache.enabled = true;
      cloned.cache.ttl = 3600; // 1 година
    } else if (environment === 'development') {
      cloned.logging.level = 'debug';
      cloned.cache.enabled = false;
      cloned.logging.console = true;
    }

    return cloned;
  }

  // Методи для модифікації конфігурації
  public updateDatabase(config: Partial<DatabaseConfig>): ApplicationConfig {
    const cloned = this.clone();
    cloned.database = { ...cloned.database, ...config };
    return cloned;
  }

  public updateCache(config: Partial<CacheConfig>): ApplicationConfig {
    const cloned = this.clone();
    cloned.cache = { ...cloned.cache, ...config };
    return cloned;
  }

  // Геттери для доступу до конфігурації
  public getDatabaseConfig(): DatabaseConfig {
    return { ...this.database };
  }

  public getCacheConfig(): CacheConfig {
    return { ...this.cache };
  }

  public getLoggingConfig(): LoggingConfig {
    return { ...this.logging };
  }

  public getEnvironment(): string {
    return this.environment;
  }

  // Метод для валідації конфігурації
  public validate(): boolean {
    return (
      this.database.host.length > 0 &&
      this.database.port > 0 &&
      this.database.username.length > 0 &&
      this.cache.ttl > 0 &&
      this.cache.maxSize > 0
    );
  }

  // Метод для отримання інформації про конфігурацію
  public getInfo(): string {
    return `Environment: ${this.environment}, Database: ${this.database.host}:${this.database.port}, Cache: ${this.cache.enabled ? 'enabled' : 'disabled'}`;
  }
}

// Приклад використання
const defaultConfig = new ApplicationConfig(
  {
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'secret',
    database: 'myapp',
    ssl: false
  },
  {
    enabled: true,
    ttl: 300,
    maxSize: 1000
  },
  {
    level: 'info',
    file: 'app.log',
    console: true
  },
  'development'
);

console.log('Default config:', defaultConfig.getInfo());

// Клонування для production
const productionConfig = defaultConfig.cloneForEnvironment('production');
console.log('Production config:', productionConfig.getInfo());

// Клонування з модифікацією бази даних
const stagingConfig = defaultConfig.updateDatabase({
  host: 'staging-db.example.com',
  port: 5432,
  ssl: true
});
console.log('Staging config:', stagingConfig.getInfo());

// Клонування з модифікацією кешу
const highPerformanceConfig = defaultConfig.updateCache({
  ttl: 600,
  maxSize: 5000
});
console.log('High performance config:', highPerformanceConfig.getInfo());

// Валідація конфігурації
console.log('Default config valid:', defaultConfig.validate());
console.log('Production config valid:', productionConfig.validate());
