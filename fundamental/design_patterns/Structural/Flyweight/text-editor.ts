// Flyweight Pattern - текстовий редактор з шрифтами

// Flyweight - спільні дані шрифтів
class FontFlyweight {
  private static cache: Map<string, FontFlyweight> = new Map();

  // Громісткі дані - шрифтові файли (base64)
  private readonly fontData: string;
  private readonly fontFamily: string;
  private readonly fontWeight: string;
  private readonly fontStyle: string;

  private constructor(fontData: string, fontFamily: string, fontWeight: string, fontStyle: string) {
    this.fontData = fontData;
    this.fontFamily = fontFamily;
    this.fontWeight = fontWeight;
    this.fontStyle = fontStyle;
  }

  // Фабричний метод
  public static getFont(key: string, fontData: string, fontFamily: string, fontWeight: string, fontStyle: string): FontFlyweight {
    if (!FontFlyweight.cache.has(key)) {
      console.log(`Loading font: ${fontFamily} ${fontWeight} ${fontStyle}`);
      FontFlyweight.cache.set(key, new FontFlyweight(fontData, fontFamily, fontWeight, fontStyle));
    } else {
      console.log(`Reusing font: ${fontFamily} ${fontWeight} ${fontStyle}`);
    }
    return FontFlyweight.cache.get(key)!;
  }

  public getFontData(): string {
    return this.fontData;
  }

  public getFontFamily(): string {
    return this.fontFamily;
  }

  public getFontWeight(): string {
    return this.fontWeight;
  }

  public getFontStyle(): string {
    return this.fontStyle;
  }

  public getSizeInBytes(): number {
    return this.fontData.length * 0.75;
  }

  public static getCacheStats(): { size: number; totalMemory: number } {
    let totalMemory = 0;
    for (const flyweight of FontFlyweight.cache.values()) {
      totalMemory += flyweight.getSizeInBytes();
    }
    return { size: FontFlyweight.cache.size, totalMemory };
  }
}

// Context - унікальні дані символів
class Character {
  private char: string;
  private fontSize: number;
  private color: string;
  private x: number;
  private y: number;
  private font: FontFlyweight;

  constructor(char: string, fontSize: number, color: string, x: number, y: number, font: FontFlyweight) {
    this.char = char;
    this.fontSize = fontSize;
    this.color = color;
    this.x = x;
    this.y = y;
    this.font = font;
  }

  public render(): void {
    console.log(`Rendering '${this.char}' at (${this.x}, ${this.y}) with ${this.fontSize}px ${this.font.getFontFamily()} in ${this.color}`);
  }

  public getChar(): string {
    return this.char;
  }

  public getPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  public getStyle(): { fontSize: number; color: string } {
    return { fontSize: this.fontSize, color: this.color };
  }
}

// Фабрика для створення символів
class CharacterFactory {
  private static fontCache: Map<string, FontFlyweight> = new Map();

  public static createCharacter(
    char: string,
    fontSize: number,
    color: string,
    x: number,
    y: number,
    fontFamily: string,
    fontWeight: string = 'normal',
    fontStyle: string = 'normal'
  ): Character {
    const fontKey = `${fontFamily}_${fontWeight}_${fontStyle}`;
    const fontData = this.getFontData(fontFamily, fontWeight, fontStyle);

    const font = FontFlyweight.getFont(fontKey, fontData, fontFamily, fontWeight, fontStyle);
    return new Character(char, fontSize, color, x, y, font);
  }

  // Симуляція завантаження шрифтових даних
  private static getFontData(fontFamily: string, fontWeight: string, fontStyle: string): string {
    // В реальному додатку це були б base64 дані шрифтів
    const mockFontData = `data:font/woff2;base64,${'A'.repeat(1000)}`; // Симуляція 1KB шрифту
    return mockFontData;
  }

  public static getStats(): { fonts: number; totalMemory: number } {
    return FontFlyweight.getCacheStats();
  }
}

// Текстовий редактор
class TextEditor {
  private characters: Character[] = [];
  private currentX: number = 0;
  private currentY: number = 0;
  private currentFont: string = 'Arial';
  private currentFontWeight: string = 'normal';
  private currentFontStyle: string = 'normal';
  private currentFontSize: number = 12;
  private currentColor: string = '#000000';

  public addText(text: string): void {
    for (const char of text) {
      if (char === '\n') {
        this.currentY += this.currentFontSize;
        this.currentX = 0;
        continue;
      }

      const character = CharacterFactory.createCharacter(
        char,
        this.currentFontSize,
        this.currentColor,
        this.currentX,
        this.currentY,
        this.currentFont,
        this.currentFontWeight,
        this.currentFontStyle
      );

      this.characters.push(character);
      this.currentX += this.currentFontSize * 0.6; // Приблизна ширина символу
    }
  }

  public setFont(fontFamily: string, fontWeight: string = 'normal', fontStyle: string = 'normal'): void {
    this.currentFont = fontFamily;
    this.currentFontWeight = fontWeight;
    this.currentFontStyle = fontStyle;
  }

  public setFontSize(size: number): void {
    this.currentFontSize = size;
  }

  public setColor(color: string): void {
    this.currentColor = color;
  }

  public render(): void {
    console.log('\n=== Rendering Text ===');
    for (const char of this.characters) {
      char.render();
    }
  }

  public getStats(): { characters: number; fonts: number; memory: number } {
    const fontStats = CharacterFactory.getStats();
    return {
      characters: this.characters.length,
      fonts: fontStats.size,
      memory: fontStats.totalMemory
    };
  }

  public clear(): void {
    this.characters = [];
    this.currentX = 0;
    this.currentY = 0;
  }
}

// Приклад використання
console.log('=== Text Editor Flyweight Demo ===');

const editor = new TextEditor();

// Додавання тексту з різними шрифтами
editor.setFont('Arial', 'normal', 'normal');
editor.setFontSize(14);
editor.setColor('#000000');
editor.addText('Hello World!\n');

editor.setFont('Times New Roman', 'bold', 'italic');
editor.setFontSize(16);
editor.setColor('#FF0000');
editor.addText('This is bold italic text\n');

editor.setFont('Arial', 'normal', 'normal');
editor.setFontSize(12);
editor.setColor('#0000FF');
editor.addText('Back to normal text');

// Рендеринг
editor.render();

// Статистика
const stats = editor.getStats();
console.log('\n=== Memory Statistics ===');
console.log(`Characters: ${stats.characters}`);
console.log(`Fonts in cache: ${stats.fonts}`);
console.log(`Memory used: ${stats.memory} bytes`);

// Демонстрація переваг
console.log('\n=== Memory Optimization ===');
console.log('Without Flyweight: 50 characters × 1KB font = 50KB');
console.log(`With Flyweight: ${stats.fonts} fonts × 1KB = ${stats.memory} bytes`);
console.log(`Memory saved: ${50000 - stats.memory} bytes (${Math.round((1 - stats.memory / 50000) * 100)}%)`);

// Додавання більше тексту для демонстрації
console.log('\n=== Adding More Text ===');
editor.setFont('Arial', 'bold', 'normal');
editor.addText('\nMore text with the same font...');
editor.setFont('Times New Roman', 'normal', 'italic');
editor.addText('\nAnd more text with different font...');

const newStats = editor.getStats();
console.log(`Updated stats - Characters: ${newStats.characters}, Fonts: ${newStats.fonts}, Memory: ${newStats.memory} bytes`);
