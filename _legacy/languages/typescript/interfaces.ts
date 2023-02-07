function foo1(obj: {name: string}): void {
    console.log(obj.name)
}

foo1({name: 'aaa' });
//////
interface Obj {
    readonly name: string;
    title?: string;
}

function foo2(obj: Obj): Obj {
    console.log('foo2', obj.name);
    // obj.name = '111'; // error!
    return obj;
}
const a: Obj = {
    name: 'yura',
}
foo2(a);

////
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];