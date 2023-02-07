// basic
var isBoolean: boolean = false;
var isNumber: number = 7;
var isString: string = "blue";
var Any: any = {anyKey: 1111};

var stringOrNumber: number | string = 15;
stringOrNumber = '15';
// stringOrNumber = false; // error!!!

var unusable: void = undefined; // only undefined or null
var u: undefined = undefined;
var n: null = null;

// arrays
var arr: number[] = [1, 5, 6];
var arr0: [number, string]  = [1, '5'];
var arr1: Array<number> = [1,2,3,5];
var list: any[] = [1, true, "free"];

// Enum
enum Color {red, green, blue};

var blue: Color = Color.blue; // 2
var colorName: string = Color[blue]; // "blue"
// enum Color {Red = 1, Green, Blue}
// let colorName: string = Color[2];
// console.log(colorName); // Displays 'Green' as its value is 2 above

// Type assertions
var someValue: any = "this is a string";
var strLength: number = (someValue as string).length;
// var strLength: number = (<string>someValue).length; // not possible in react
